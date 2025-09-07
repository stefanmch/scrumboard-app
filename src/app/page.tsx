import { Board } from '@/components/board/Board';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">ScrumBoard</h1>
              <span className="ml-4 bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                Sprint 1
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                + New Story
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <Board />
      </main>
    </div>
  );
}
