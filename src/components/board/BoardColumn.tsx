import { Column } from '@/types';
import { StoryCard } from '@/components/story/StoryCard';
import { Plus } from 'lucide-react';

interface BoardColumnProps {
  column: Column;
  onAddStory?: () => void;
  onEditStory?: (story: any) => void;
}

export function BoardColumn({ column, onAddStory, onEditStory }: BoardColumnProps) {
  const getColumnStyle = (status: string) => {
    switch (status) {
      case 'todo':
        return {
          backgroundColor: '#dbeafe', // blue-100
          borderColor: '#93c5fd', // blue-300
        };
      case 'in-progress':
        return {
          backgroundColor: '#fffbeb', // amber-50
          borderColor: '#fde68a', // amber-200
        };
      case 'done':
        return {
          backgroundColor: '#ecfdf5', // emerald-50
          borderColor: '#a7f3d0', // emerald-200
        };
      default:
        return {
          backgroundColor: '#f9fafb',
          borderColor: '#e5e7eb',
        };
    }
  };

  const getHeaderStyle = (status: string) => {
    switch (status) {
      case 'todo':
        return { color: '#1d4ed8' }; // blue-700
      case 'in-progress':
        return { color: '#a16207' }; // amber-700
      case 'done':
        return { color: '#047857' }; // emerald-700
      default:
        return { color: '#374151' };
    }
  };

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'todo':
        return {
          backgroundColor: '#bfdbfe', // blue-200
          color: '#1e3a8a', // blue-800
        };
      case 'in-progress':
        return {
          backgroundColor: '#fef3c7', // amber-100
          color: '#92400e', // amber-800
        };
      case 'done':
        return {
          backgroundColor: '#d1fae5', // emerald-100
          color: '#065f46', // emerald-800
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
        };
    }
  };

  return (
    <div 
      className="rounded-xl p-6 w-80 flex-shrink-0 border-2 shadow-lg"
      style={getColumnStyle(column.status)}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 
            className="font-bold text-lg"
            style={getHeaderStyle(column.status)}
          >
            {column.title}
          </h2>
          <span 
            className="ml-3 text-sm px-3 py-1 rounded-full font-medium"
            style={getBadgeStyle(column.status)}
          >
            {column.stories.length}
          </span>
        </div>
        <button
          onClick={onAddStory}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-50 rounded-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Stories */}
      <div className="space-y-4 min-h-[300px]">
        {column.stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onEdit={onEditStory}
          />
        ))}
      </div>
    </div>
  );
}
