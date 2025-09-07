'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { BoardColumn } from './BoardColumn';
import { StoryCard } from '@/components/story/StoryCard';
import { initialColumns } from '@/lib/mockData';
import { Story, Column } from '@/types';

export function Board() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const story = findStoryById(active.id as string);
    setActiveStory(story);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeStoryId = active.id as string;
    const overTarget = over.id as string;

    // Find the story and its current column
    const activeStory = findStoryById(activeStoryId);
    const activeColumn = findColumnByStoryId(activeStoryId);

    if (!activeStory || !activeColumn) return;

    // Check if we're hovering over a column or another story
    const overColumn = columns.find(col => col.id === overTarget);
    const overStory = findStoryById(overTarget);

    if (overColumn && activeColumn.id !== overColumn.id) {
      // Moving to a different column
      moveStoryToColumn(activeStory, activeColumn, overColumn);
    } else if (overStory && overStory.id !== activeStory.id) {
      // Reordering within the same column or moving to a specific position
      const overStoryColumn = findColumnByStoryId(overStory.id);
      if (overStoryColumn) {
        if (activeColumn.id === overStoryColumn.id) {
          // Reordering within the same column
          reorderStoryInColumn(activeStory, overStory, activeColumn);
        } else {
          // Moving to a different column at a specific position
          moveStoryToSpecificPosition(activeStory, activeColumn, overStoryColumn, overStory);
        }
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveStory(null);
  };

  const moveStoryToColumn = (story: Story, fromColumn: Column, toColumn: Column) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === fromColumn.id) {
          // Remove story from source column and update ranks
          const filteredStories = column.stories.filter(s => s.id !== story.id);
          return {
            ...column,
            stories: filteredStories.map((s, index) => ({ ...s, rank: index + 1 }))
          };
        } else if (column.id === toColumn.id) {
          // Add story to target column at the bottom
          const updatedStory = {
            ...story,
            status: toColumn.status,
            rank: toColumn.stories.length + 1,
            updatedAt: new Date()
          };
          return {
            ...column,
            stories: [...column.stories, updatedStory]
          };
        }
        return column;
      });
    });
  };

  const reorderStoryInColumn = (activeStory: Story, overStory: Story, column: Column) => {
    setColumns(prevColumns => {
      return prevColumns.map(col => {
        if (col.id === column.id) {
          const oldIndex = col.stories.findIndex(s => s.id === activeStory.id);
          const newIndex = col.stories.findIndex(s => s.id === overStory.id);
          
          if (oldIndex !== -1 && newIndex !== -1) {
            const reorderedStories = arrayMove(col.stories, oldIndex, newIndex);
            // Update ranks based on new positions
            return {
              ...col,
              stories: reorderedStories.map((s, index) => ({
                ...s,
                rank: index + 1,
                updatedAt: s.id === activeStory.id ? new Date() : s.updatedAt
              }))
            };
          }
        }
        return col;
      });
    });
  };

  const moveStoryToSpecificPosition = (story: Story, fromColumn: Column, toColumn: Column, targetStory: Story) => {
    setColumns(prevColumns => {
      return prevColumns.map(column => {
        if (column.id === fromColumn.id) {
          // Remove story from source column and update ranks
          const filteredStories = column.stories.filter(s => s.id !== story.id);
          return {
            ...column,
            stories: filteredStories.map((s, index) => ({ ...s, rank: index + 1 }))
          };
        } else if (column.id === toColumn.id) {
          // Insert story at the target position
          const targetIndex = column.stories.findIndex(s => s.id === targetStory.id);
          const updatedStory = {
            ...story,
            status: toColumn.status,
            updatedAt: new Date()
          };
          
          const newStories = [...column.stories];
          newStories.splice(targetIndex, 0, updatedStory);
          
          // Update ranks for all stories in the column
          return {
            ...column,
            stories: newStories.map((s, index) => ({ ...s, rank: index + 1 }))
          };
        }
        return column;
      });
    });
  };

  const findStoryById = (storyId: string): Story | null => {
    for (const column of columns) {
      const story = column.stories.find(s => s.id === storyId);
      if (story) return story;
    }
    return null;
  };

  const findColumnByStoryId = (storyId: string): Column | null => {
    for (const column of columns) {
      if (column.stories.some(s => s.id === storyId)) return column;
    }
    return null;
  };

  return (
    <DndContext 
      onDragStart={handleDragStart} 
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sprint Board</h1>
          <p className="text-gray-600">Drag stories between columns or reorder within columns to prioritize</p>
        </div>

        {/* Board */}
        <div className="flex gap-8 overflow-x-auto pb-8">
          {columns.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              onAddStory={() => console.log('Add story to', column.title)}
              onEditStory={(story) => console.log('Edit story', story.title)}
            />
          ))}
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeStory ? (
          <div className="transform rotate-3 shadow-2xl">
            <StoryCard story={activeStory} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
