interface ChessPieceProps {
    piece: string;
    color: 'white' | 'black';
  }
  
  const ChessPiece: React.FC<ChessPieceProps> = ({ piece, color }) => {
    const pieceSymbols: { [key: string]: { [key: string]: string } } = {
      'white': { 'king': '♔', 'queen': '♕', 'rook': '♖', 'bishop': '♗', 'knight': '♘', 'pawn': '♙' },
      'black': { 'king': '♚', 'queen': '♛', 'rook': '♜', 'bishop': '♝', 'knight': '♞', 'pawn': '♟' }
    };
  
    return (
      <span className={`text-4xl ${color === 'white' ? 'text-yellow-200' : 'text-gray-800'}`}>
        {pieceSymbols[color][piece]}
      </span>
    );
  };
  
  const ChessBoard: React.FC = () => {
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
      <div className="grid grid-cols-8 gap-px bg-gray-600 p-px rounded-lg overflow-hidden">
        {pieces.map((piece, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isWhite = row >= 6;
          const pieceColor = isWhite ? 'white' : 'black';
          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center
                          ${(row + col) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-500'}`}
            >
              {piece && <ChessPiece piece={piece} color={pieceColor} />}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default ChessBoard;
  