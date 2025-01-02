"use client";

import { useState, useEffect } from "react";
import { Chess, Move } from "chess.js";
import { Chessboard } from "react-chessboard";
import { RefreshCw } from 'lucide-react';
import io from 'socket.io-client';
import { Socket } from "socket.io-client";
import Image from 'next/image';

const chess = new Chess();

function ChessBoard({ onMove, roomId, playerSide }: { 
  onMove?: (move: Move) => void; 
  roomId: string; 
  playerSide: 'white' | 'black' 
}) {
  const [winner, setWinner] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit('joinRoom', roomId);

    newSocket.on('opponentMove', (moveData) => {
      chess.move(moveData);
      onMove?.(moveData);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, onMove]);

  const isPlayerTurn = chess.turn() === (playerSide === 'white' ? 'w' : 'b');

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    if (!isPlayerTurn || winner) return false;

    const movingPiece = chess.get(sourceSquare);
    
    const isPawnPromotion = 
      movingPiece?.type === 'p' && 
      ((movingPiece.color === 'w' && targetSquare[1] === '8') || 
       (movingPiece.color === 'b' && targetSquare[1] === '1'));

    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: isPawnPromotion ? piece.charAt(1).toLowerCase() : undefined
      });

      if (move) {
        socket?.emit('playerMove', { roomId, move });
        onMove?.(move);

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

  const customPromotionDialog = ({
    square,
    promotionPieces
  }: {
    square: string;
    promotionPieces: string[];
  }) => {
    const color = chess.turn() === 'w' ? 'white' : 'black';
    const style: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      border: '2px solid #666',
      borderRadius: '4px',
      backgroundColor: '#333',
      zIndex: 30,
      cursor: 'pointer',
    };

    // Position the dialog next to the promotion square
    const file = square.charAt(0);
    const rank = parseInt(square.charAt(1));
    const isWhitePromotion = rank === 8;

    // Adjust position based on the promotion square
    if (playerSide === 'white') {
      style.left = `${12.5 * (file.charCodeAt(0) - 'a'.charCodeAt(0))}%`;
      style.top = isWhitePromotion ? '0%' : '50%';
    } else {
      style.left = `${12.5 * (7 - (file.charCodeAt(0) - 'a'.charCodeAt(0)))}%`;
      style.top = isWhitePromotion ? '50%' : '0%';
    }

    return (
      <div style={style}>
        {promotionPieces.map((piece, index) => (
          <div
            key={index}
            className="w-[50px] h-[50px] flex items-center justify-center hover:bg-gray-700"
            data-piece={piece}
          >
            <Image
              src={`/pieces/${color}${piece.charAt(1).toUpperCase()}.png`}
              alt={piece}
              width={40}
              height={40}
              priority
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full pt-[100%]">
      <div className="absolute inset-0">
        <Chessboard 
          position={chess.fen()}
          onPieceDrop={onDrop}
          boardOrientation={playerSide}
          customBoardStyle={{
            borderRadius: '0.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
          customPromotionDialog={customPromotionDialog}
          showPromotionDialog={true}
          areArrowsAllowed={false}
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
