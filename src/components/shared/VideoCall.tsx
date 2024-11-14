import { User, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PlayerPlaceholderProps {
  label: string;
}

const PlayerPlaceholder: React.FC<PlayerPlaceholderProps> = ({ label }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col items-center justify-center aspect-video">
    <User className="w-1/4 h-1/4 text-gray-400" />
    <span className="mt-2 text-sm text-gray-400">{label}</span>
  </div>
);

const VideoCall: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-full space-y-4">
      <PlayerPlaceholder label="Figure 1" />
      <PlayerPlaceholder label="Figure 2" />
      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        <ChevronRight className="w-4 h-4 mr-2" />
        Next Player
      </Button>
    </div>
  );
};

export default VideoCall;
