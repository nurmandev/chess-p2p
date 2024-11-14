// src/app/game/page.tsx
import Header from '@/components/shared/Header';
import VideoCall from '@/components/shared/VideoCall';
import ChessBoard from '@/components/shared/ChessBoard';
import MovesList from '@/components/shared/MovesList';

export default function GamePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row">
        <VideoCall />
        <div className="w-full md:w-1/2 p-4 bg-gray-900 flex items-center justify-center">
          <ChessBoard />
        </div>
        <MovesList />
      </main>
    </div>
  );
}
