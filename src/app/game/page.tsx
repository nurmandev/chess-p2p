import VideoCall from '@/components/shared/VideoCall';
import ChessBoard from '@/components/shared/ChessBoard';
import MovesList from '@/components/shared/MovesList';

export default function GamePage() {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <header className="bg-gray-800 py-4 px-6 text-center">
          <h1 className="text-3xl font-bold">Chess P2P</h1>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr,1fr] gap-4 p-6">
              <VideoCall />
              <div className="flex items-center justify-center">
                <ChessBoard />
              </div>
              <MovesList />
            </div>
          </div>
        </main>
      </div>
    );
  }