import React from 'react';

const MovesList: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-white shadow-lg p-4 rounded-md mb-4">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Moves History</h2>
        <ul className="list-decimal list-inside space-y-1 text-gray-600">
          <li>e2 to e4</li>
          <li>d7 to d5</li>
          {/* Placeholder moves; we’ll dynamically add moves here */}
        </ul>
      </div>
      <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        New Match
      </button>
    </div>
  );
};

export default MovesList;
