"use client";

import { useState, useEffect } from "react";
import { Chess, Move } from "chess.js";
import { Chessboard } from "react-chessboard";
import { RefreshCw } from 'lucide-react';
import io from 'socket.io-client';

const chess = new Chess();

function ChessBoard({ onMove, roomId, playerSide }: { 
  onMove?: (move: Move) => void; 
  roomId: string; 
  playerSide: 'white' | 'black' 
}) {
  const [board, setBoard] = useState(chess.board());
  const [winner, setWinner] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit('joinRoom', roomId);

    newSocket.on('opponentMove', (moveData) => {
      chess.move(moveData);
      setBoard(chess.board());
      onMove?.(moveData);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const isPlayerTurn = chess.turn() === (playerSide === 'white' ? 'w' : 'b');

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    if (!isPlayerTurn || winner) return false;

    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1]?.toLowerCase() === 'p' && (targetSquare[1] === '8' || targetSquare[1] === '1') ? 'q' : undefined,
      });

      if (move) {
        socket.emit('playerMove', { roomId, move });
        onMove?.(move);
        setBoard(chess.board());

        if (chess.isCheckmate()) {
          setWinner(chess.turn() === 'w' ? 'Black' : 'White');
        }
        return true;
      }
    } catch (error) {
      console.error("Invalid move:", error);
    }
    return false;
  }

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
      <div className="w-full h-full aspect-square relative">
        <Chessboard 
          position={chess.fen()}
          onPieceDrop={onDrop}
          boardOrientation={playerSide}
          customBoardStyle={{
            borderRadius: '0.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        />
        
        {winner && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm z-20 rounded-lg">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white w-80 max-w-full mx-4 sm:mx-auto">
              <h2 className="text-2xl font-bold mb-4">{winner} wins!</h2>
              <p className="mb-4">Congratulations to the winner!</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw size={20} />
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChessBoard;
