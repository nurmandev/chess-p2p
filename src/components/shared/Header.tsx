interface HeaderProps {
  status: string;
  matchFound: boolean;
}

export default function Header({ status, matchFound }: HeaderProps) {
  const getStatusColor = () => {
    if (matchFound) return 'bg-green-500';
    
    switch (status.toLowerCase()) {
      case 'connecting':
        return 'bg-yellow-500';
      case 'waiting':
        return 'bg-blue-500';
      case 'connected':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <header className="flex justify-center w-full bg-gray-900 pt-3 pb-2 px-4 lg:pt-4 lg:pb-3">
      <div className="flex items-center gap-4 max-w-3xl">
        <h1 className="text-2xl lg:text-3xl font-bold">Chess P2P</h1>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`} />
          <span className="text-sm text-gray-400">
            {matchFound ? 'Match Found!' : status}
          </span>
        </div>
      </div>
    </header>
  );
}