// src/app/game/page.tsx
import VideoCall from '@/components/shared/VideoCall';
import ChessBoard from '@/components/shared/ChessBoard';
import MovesList from '@/components/shared/MovesList';

export default function GamePage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-900 text-white">
      <div className="flex flex-grow bg-gray-900 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr,2fr,1fr] gap-4 w-full h-full">
          <VideoCall />
          <ChessBoard />
          <MovesList />
        </div>
      </div>
    </div>
  );
}
