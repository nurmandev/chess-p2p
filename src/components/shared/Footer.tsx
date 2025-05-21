export default function Footer() {
  return (
    <footer className="py-6 border-t border-border bg-background">
      <div className="container mx-auto px-4 text-center text-muted-foreground flex flex-col gap-2">
        <p>© 2025 Chess P2P. All rights reserved.</p>
        <span className="block py-1">
          Made with ❤️ by{' '}
          <a 
            href="https://nurudeenm.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline"
          >
            PROFICIENT
          </a>
        </span>
      </div>
    </footer>
  );
}