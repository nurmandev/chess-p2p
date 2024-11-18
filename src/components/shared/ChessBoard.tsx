"use client"

import { useState } from "react";
import { Chess, Square } from "chess.js";

const chess = new Chess();

function ChessBoard() {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [promotionSquare, setPromotionSquare] = useState<string | null>(null);
  const [board, setBoard] = useState(chess.board());

  const handleSquareClick = (square: string) => {
    if (promotionSquare) return; // Block interactions during promotion

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
        setBoard(chess.board());
        setSelectedSquare(null);
        setValidMoves([]);
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

  const handlePromotion = (piece: string) => {
    if (!promotionSquare || !selectedSquare) return;

    const move = chess.move({
      from: selectedSquare,
      to: promotionSquare,
      promotion: piece as 'q' | 'r' | 'b' | 'n',
    });

    if (move) {
      setBoard(chess.board());
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
    <div className="w-full h-full aspect-square grid grid-cols-8 gap-px bg-gray-600 p-px rounded-lg overflow-hidden">
      {board.flatMap((row, rowIndex) =>
        row.map((square, colIndex) => {
          const squareName = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
          const isValidMove = validMoves.includes(squareName);
          const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;

          return (
            <div
              key={squareName}
              className={`aspect-square flex items-center justify-center relative ${
                isWhiteSquare ? "bg-gray-400" : "bg-gray-600"
              }`}
              onClick={() => handleSquareClick(squareName)}
            >
              {square && (
                <span
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
                    square.color === "w" ? "text-yellow-100" : "text-gray-800"
                  }`}>
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
        })
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
