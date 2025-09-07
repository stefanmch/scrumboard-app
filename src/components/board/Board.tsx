'use client';

import { useState } from 'react';
import { BoardColumn } from './BoardColumn';
import { initialColumns } from '@/lib/mockData';

export function Board() {
  const [columns, setColumns] = useState(initialColumns);

  const handleAddStory = () => {
    // Placeholder for adding new story
    console.log('Add new story');
  };

  const handleEditStory = (story: any) => {
    // Placeholder for editing story
    console.log('Edit story:', story);
  };

  return (
    <div className="h-full overflow-x-auto px-4">
      <div className="flex gap-8 min-w-max">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            onAddStory={handleAddStory}
            onEditStory={handleEditStory}
          />
        ))}
      </div>
    </div>
  );
}
