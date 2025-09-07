export default function TestColors() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Color Test Page</h1>
      
      {/* Column backgrounds */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-red-50 border-red-200 border-2 p-4 rounded">
          <h2 className="text-red-700 font-bold">To Do Column</h2>
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Red Badge</span>
        </div>
        <div className="bg-amber-50 border-amber-200 border-2 p-4 rounded">
          <h2 className="text-amber-700 font-bold">In Progress Column</h2>
          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded">Amber Badge</span>
        </div>
        <div className="bg-emerald-50 border-emerald-200 border-2 p-4 rounded">
          <h2 className="text-emerald-700 font-bold">Done Column</h2>
          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Green Badge</span>
        </div>
      </div>

      {/* Priority badges */}
      <div className="space-x-2">
        <span className="bg-red-100 text-red-800 border-red-300 border px-3 py-1 rounded-full">HIGH</span>
        <span className="bg-amber-100 text-amber-800 border-amber-300 border px-3 py-1 rounded-full">MEDIUM</span>
        <span className="bg-emerald-100 text-emerald-800 border-emerald-300 border px-3 py-1 rounded-full">LOW</span>
      </div>

      {/* Points badges */}
      <div className="space-x-2">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">1-2 pts</span>
        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded">3-4 pts</span>
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">5-6 pts</span>
        <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded">7-8 pts</span>
      </div>
    </div>
  );
}
