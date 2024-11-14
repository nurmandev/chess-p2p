import ChessBoard from '@/components/shared/ChessBoard';
import VideoCall from '@/components/shared/VideoCall';
import MovesList from '@/components/shared/MovesList';

export default function GamePage() {
  return (
    <div className="grid grid-cols-4 h-screen bg-gray-900 text-white">
      {/* Left Panel - Video Call */}
      <div className="col-span-1 flex flex-col items-center justify-center space-y-4 p-4 border-r border-gray-700">
        <VideoCall player="Figure 1" />
        <VideoCall player="Figure 2" />
      </div>

      {/* Center Panel - Chessboard */}
      <div className="col-span-2 flex items-center justify-center p-4">
        <ChessBoard />
      </div>

      {/* Right Panel - Moves List and New Match Button */}
      <div className="col-span-1 flex flex-col items-center justify-between p-4 border-l border-gray-700">
        <MovesList />
        <button className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          New Match
        </button>
      </div>
    </div>
  );
}

