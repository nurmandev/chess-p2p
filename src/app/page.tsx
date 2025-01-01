import Link from 'next/link';
import Footer from '@/components/shared/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
              Welcome to Chess Peer-2-Peer
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Connect with chess players worldwide in real-time matches
            </p>
            <Link href="/game">
              <button className="transform hover:scale-105 transition-all duration-300 px-10 py-4 text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-green-500/30">
                Start Playing Now
              </button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Instant Matches</h3>
              <p className="text-gray-300">
                Like Omegle for chess players - connect instantly with random opponents from around the world.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">All Skill Levels</h3>
              <p className="text-gray-300">
                Whether you&apos;re a beginner or a seasoned player, you&apos;ll find opponents that match your skill level.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">No Sign-up Required</h3>
              <p className="text-gray-300">
                Jump straight into the action - no registration or complicated setup needed.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-4">Global Community</h3>
              <p className="text-gray-300">
                Join chess enthusiasts from across the globe and make new friends while playing.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="mb-8">
              <p className="text-amber-400 font-medium mb-2">⚡ Ready to play?</p>
              <p className="text-gray-300">
                Ensure a stable internet connection for the best experience
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-400">
                Want to contribute? Check out our{' '}
                <a 
                  href="https://github.com/your-repo" 
                  className="text-green-500 hover:text-green-400 underline decoration-dotted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub repository
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}