import React from 'react';

const ChessBoard: React.FC = () => {
  return (
    <div className="w-[400px] h-[400px] bg-gray-800 rounded-md shadow-lg flex items-center justify-center">
      <p className="text-gray-400 text-lg">Chess Board</p>
      {/* Placeholder; actual chessboard will replace this */}
    </div>
  );
};

export default ChessBoard;
