import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full h-full flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-8">Welcome to Chess Peer-2-Peer</h1>
        <p className="text-md mb-4">
          Chess Peer-2-Peer is an open-source project aimed at providing a seamless online chess experience.
        </p>
        <p className="text-md mb-4">
          Our platform is like Omegle for chess players, allowing you to connect and play with random opponents from around the world.
        </p>
        <p className="text-md mb-4">
          Our platform offers a unique and engaging way to play chess online. Whether you&apos;re a beginner or a seasoned player, you&apos;ll find opponents of all skill levels.
        </p>
        <p className="text-md mb-8">
          Join a community of chess enthusiasts and make new friends while playing your favorite game.
        </p>
        <p className="text-lg mb-4">
          Play chess with your friends in real-time. No sign-ups required, just start a match and enjoy!
        </p>
        <Link href="/game">
          <button className="px-8 py-4 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600">
            Start Match
          </button>
        </Link>
        <p className="text-sm mt-4 text-gray-400">
          Note: Ensure a stable internet connection for the best experience.
        </p>
        <p className="text-md mt-8">
          Contribute to the project on <a href="https://github.com/your-repo" className="text-green-500 hover:underline">GitHub</a>.
        </p>
      </div>
      <footer className="mt-4 text-center text-gray-400">
        <p>Made with ❤️ by <a href="https://x.com/JatinSriva36542?t=jInLA9mjPJc3klWMBmAhDg&s=09" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Jatin</a></p>
      </footer>
    </div>
  );
}