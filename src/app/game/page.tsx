import ChessBoard from '@/components/shared/ChessBoard';
import VideoCall from '@/components/shared/VideoCall';
import MovesList from '@/components/shared/MovesList';

export default function GamePage() {
  return (
    <div className="grid grid-cols-4 h-screen">
      {/* Video Section */}
      <div className="col-span-1 flex flex-col items-center justify-center space-y-4 p-4">
        <VideoCall player="Player 1" />
        <VideoCall player="Player 2" />
      </div>

      {/* Chessboard Section */}
      <div className="col-span-2 flex items-center justify-center p-4">
        <ChessBoard />
      </div>

      {/* Moves Section */}
      <div className="col-span-1 flex flex-col items-center justify-center space-y-4 p-4">
        <MovesList />
      </div>
    </div>
  );
}
