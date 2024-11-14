import React from 'react';

const MovesList: React.FC = () => {
  return (
    <div className="w-full bg-gray-800 rounded-md p-4 shadow-lg mb-4 h-3/4 overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-300 mb-2">Moves</h2>
      <ul className="list-decimal list-inside space-y-1 text-gray-400">
        <li>e2 to e4</li>
        <li>d7 to d5</li>
        {/* Placeholder moves; dynamically add moves here */}
      </ul>
    </div>
  );
};

export default MovesList;

