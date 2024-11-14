// src/components/ChessBoard.tsx
export default function ChessBoard() {
    const pieces = [
      "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook",
      "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
      "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"
    ];
  
    return (
      <div className="w-full max-w-2xl aspect-square grid grid-cols-8 gap-px bg-gray-600 p-px rounded-lg overflow-hidden">
        {pieces.map((piece, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isWhite = row >= 6;
          const pieceColor = isWhite ? 'white' : 'black';
          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center
                          ${(row + col) % 2 === 0 ? 'bg-gray-400' : 'bg-gray-600'}`}
            >
              {piece && (
                <ChessPiece piece={piece} color={pieceColor} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
  
  function ChessPiece({ piece, color }: { piece: string; color: 'white' | 'black' }) {
    const pieceSymbols: { [key: string]: { [key: string]: string } } = {
      'white': {
        'king': '♚', 'queen': '♛', 'rook': '♜', 'bishop': '♝', 'knight': '♞', 'pawn': '♟'
      },
      'black': {
        'king': '♚', 'queen': '♛', 'rook': '♜', 'bishop': '♝', 'knight': '♞', 'pawn': '♟'
      }
    };
  
    return (
      <span className={`text-5xl ${color === 'white' ? 'text-yellow-100' : 'text-gray-800'}`}>
        {pieceSymbols[color][piece]}
      </span>
    );
  }
  