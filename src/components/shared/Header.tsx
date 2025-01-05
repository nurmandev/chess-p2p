interface HeaderProps {
  status: string;
  matchFound: boolean;
  onChessP2PClick: () => void;
}

export default function Header({ status, matchFound, onChessP2PClick }: HeaderProps) {
  const getStatusColor = () => {
    if (matchFound) return 'text-primary';
    
    switch (status.toLowerCase()) {
      case 'connecting':
        return 'text-yellow-500';  // Yellow for connecting
      case 'waiting':
        return 'text-blue-500';    // Blue for waiting
      case 'connected':
        return 'text-primary';     // Green (primary) for connected
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <header className="flex justify-center w-full bg-background border-b border-border pt-3 pb-2 px-4 lg:pt-4 lg:pb-3">
      <div className="flex items-center gap-4 max-w-3xl">
        <div onClick={onChessP2PClick} className="cursor-pointer">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Chess P2P</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full bg-current ${getStatusColor()} animate-pulse`} />
          <span className="text-sm text-muted-foreground">
            {matchFound ? 'Match Found!' : status}
          </span>
        </div>
      </div>
    </header>
  );
}