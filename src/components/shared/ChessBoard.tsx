/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Chess, Square, Move } from "chess.js";
import { RefreshCw } from 'lucide-react';
import io from 'socket.io-client';

const chess = new Chess();

function ChessBoard({ onMove, roomId, playerSide }: { onMove?: (move: Move) => void; roomId: string; playerSide: 'white' | 'black' }) {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [promotionSquare, setPromotionSquare] = useState<string | null>(null);
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
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const isPlayerTurn = chess.turn() === (playerSide === 'white' ? 'w' : 'b');

  const handleSquareClick = (square: string) => {
    if (!isPlayerTurn || promotionSquare || winner) return;

    if (selectedSquare === square) {
      setSelectedSquare(null);
      setValidMoves([]);
    } else if (selectedSquare && validMoves.includes(square)) {
      const promotionNeeded = validMoves.includes(square) && chess.get(selectedSquare as Square)?.type === "p" && (square[1] === "1" || square[1] === "8");

      if (promotionNeeded) {
        setPromotionSquare(square);
        return;
      }

      const move = chess.move({ from: selectedSquare, to: square });

      if (move) {
        handleMove(move);
        setBoard(chess.board());
        setSelectedSquare(null);
        setValidMoves([]);
        if (chess.isCheckmate()) {
          setWinner(chess.turn() === 'w' ? 'Black' : 'White');
        }
        onMove?.(move);
      } else {
        console.error("Invalid move:", { from: selectedSquare, to: square });
      }
    } else {
      const moves = chess.moves({ square: square as Square, verbose: true }).map((move) => move.to);
      if (moves.length > 0) {
        setSelectedSquare(square);
        setValidMoves(moves);
      }
    }
  };

  const handleMove = (move: Move) => {
    socket.emit('playerMove', { roomId, move });
  };

  const handlePromotion = (piece: string) => {
    if (!promotionSquare || !selectedSquare) return;

    const move = chess.move({
      from: selectedSquare,
      to: promotionSquare,
      promotion: piece as 'q' | 'r' | 'b' | 'n',
    });

    if (move) {
      handleMove(move);
      setBoard(chess.board());
      onMove?.(move);
    } else {
      console.error("Invalid promotion move:", {
        from: selectedSquare,
        to: promotionSquare,
        promotion: piece,
      });
    }

    setPromotionSquare(null);
    setSelectedSquare(null);
    setValidMoves([]);
  };

  return (
    <div className={`relative w-full h-full aspect-square grid grid-cols-8 gap-px bg-gray-600 p-px rounded-lg overflow-hidden cursor-default ${playerSide === 'black' ? 'rotate-180' : ''}`}>
      {board.flatMap((row, rowIndex) => {
        return row.map((square, colIndex) => {
          const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
          const isValidMove = validMoves.includes(squareName);
          const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;
          const isKingInCheck = square?.type === 'k' && chess.inCheck() && square.color === chess.turn();

          return (
            <div
              key={squareName}
              className={`aspect-square flex items-center justify-center relative ${
                isWhiteSquare ? "bg-gray-400" : "bg-gray-600"
              }`}
              onClick={() => handleSquareClick(squareName)}
              style={{ cursor: square ? 'grab' : 'default' }}
            >
              {square && (
                <span
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
                    isKingInCheck ? "text-red-500" : square.color === "w" ? "text-yellow-100" : "text-gray-800"
                  } ${playerSide === 'black' ? 'transform rotate-180' : ''}`}
                >
                  {getPieceSymbol(square.type as 'p' | 'n' | 'b' | 'r' | 'q' | 'k', square.color)}
                </span>
              )}

              {isValidMove && (
                <div className="w-4 h-4 bg-green-500 rounded-full absolute"></div>
              )}

              {promotionSquare === squareName && (
                <div
                  className={`absolute flex flex-col items-center bg-gray-800 p-2 rounded-md gap-1 z-10 ${
                    squareName[1] === "8" ? "top-0" : "bottom-0"
                  }`}
                >
                  {["q", "r", "b", "n"].map((piece) => (
                    <button
                      key={piece}
                      onClick={() => handlePromotion(piece)}
                      className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white hover:bg-gray-700 p-2 rounded-md w-full text-center"
                    >
                      {getPieceSymbol(piece as 'p' | 'n' | 'b' | 'r' | 'q' | 'k', "w")}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        });
      })}
      {winner && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm z-20" style={{ borderRadius: '0px' }}>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white w-80 max-w-full mx-4 sm:mx-auto" style={{ backdropFilter: 'none' }}>
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
  );
}

const symbols: { [key in 'p' | 'r' | 'n' | 'b' | 'q' | 'k']: string } = {
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
};

function getPieceSymbol(type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k', color: string) {
  return color === "w" ? symbols[type].toUpperCase() : symbols[type];
}

export default ChessBoard;
