import Link from 'next/link';
import Footer from '@/components/shared/Footer';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Original gradient background with theme colors */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_70%)]" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-block animate-bounce-slow mb-6">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="inline-block w-3 h-3 mr-2" />
                Now in Beta
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                Welcome to{' '}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                Chess P2P
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Connect with chess players worldwide in real-time matches
            </p>
            <Link href="/game">
              <button className="transform hover:scale-105 transition-all duration-300 px-10 py-4 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-primary/30">
                Start Playing Now
              </button>
            </Link>
          </div>

          {/* Features Grid - keeping original design */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Instant Matches</h3>
              <p className="text-muted-foreground">
                Like Omegle for chess players - connect instantly with random opponents from around the world.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">All Skill Levels</h3>
              <p className="text-muted-foreground">
                From beginners to masters, find your perfect match.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">No Sign-up Required</h3>
              <p className="text-muted-foreground">
                Jump straight into the action, no registration needed.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl font-semibold text-card-foreground mb-4">Global Community</h3>
              <p className="text-muted-foreground">
                Join chess enthusiasts from across the globe.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="mb-8">
              <p className="text-primary font-medium mb-2">⚡ Ready to play?</p>
              <p className="text-muted-foreground">
                Ensure a stable internet connection for the best experience
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Want to contribute? Check out our{' '}
                <a 
                  href="https://github.com/JatinSri1909/chess-p2p" 
                  className="text-primary hover:text-primary/90 underline decoration-dotted"
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