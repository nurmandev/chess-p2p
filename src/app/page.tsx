import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome to Chess Matchmaking</h1>
      <Link href="/game">
        <button className="px-8 py-4 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Start Match
        </button>
      </Link>
    </div>
  );
}