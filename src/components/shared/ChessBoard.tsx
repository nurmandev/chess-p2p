import React from 'react';

const ChessBoard: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <div className="w-96 h-96 bg-white shadow-lg flex items-center justify-center">
        <p className="text-gray-700 text-lg">Chess Board</p>
      </div>
    </div>
  );
};

export default ChessBoard;
