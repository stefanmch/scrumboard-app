import { Story } from '@/types';
import { User, Clock } from 'lucide-react';

interface StoryCardProps {
  story: Story;
  onEdit?: (story: Story) => void;
}

export function StoryCard({ story, onEdit }: StoryCardProps) {
  const getPointsStyle = (points: number) => {
    if (points <= 2) {
      return {
        backgroundColor: '#dbeafe', // blue-100
        color: '#1e40af', // blue-800
      };
    } else if (points <= 4) {
      return {
        backgroundColor: '#e0e7ff', // indigo-100
        color: '#3730a3', // indigo-800
      };
    } else if (points <= 6) {
      return {
        backgroundColor: '#e9d5ff', // purple-100
        color: '#581c87', // purple-800
      };
    } else {
      return {
        backgroundColor: '#fce7f3', // pink-100
        color: '#be185d', // pink-800
      };
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md border border-gray-200 p-5 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => onEdit?.(story)}
    >
      {/* Header with just story points */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {/* Title */}
          <h3 className="font-bold text-gray-900 text-lg line-clamp-2 leading-tight">
            {story.title}
          </h3>
        </div>
        {story.points && (
          <span 
            className="text-xs font-bold px-3 py-1 rounded-full ml-3 flex-shrink-0"
            style={getPointsStyle(story.points)}
          >
            {story.points} pts
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
        {story.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {story.assignee && (
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
            <User className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium">{story.assignee}</span>
          </div>
        )}
        <div className="flex items-center text-xs text-gray-400">
          <Clock className="w-3 h-3 mr-1" />
          <span>{story.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
