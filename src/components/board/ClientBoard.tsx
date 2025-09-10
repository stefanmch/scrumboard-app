'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Board component with no SSR
const Board = dynamic(() => import('./Board').then(mod => ({ default: mod.Board })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Sprint Board</h1>
        <p className="text-gray-600">Loading board...</p>
      </div>
      <div className="flex gap-8 overflow-x-auto pb-8">
        {/* Loading placeholder columns */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl p-6 w-80 flex-shrink-0 border-2 shadow-lg bg-gray-100 animate-pulse">
            <div className="h-6 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
});

export default Board;
