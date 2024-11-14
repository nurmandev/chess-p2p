import { User, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

function PlayerPlaceholder({ label }: { label: string }) {
    return (
      <div className="bg-gray-700 border border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center aspect-[4/3]">
        <User className="w-1/3 h-1/3 text-gray-400" />
        <span className="mt-4 text-lg text-gray-400">{label}</span>
      </div>
    );
  }
  
  export default function VideoCall() {
    return (
      <div className="flex flex-col justify-between space-y-4">
        <PlayerPlaceholder label="Player 1" />
        <PlayerPlaceholder label="Player 2" />
        <Button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white">
          <ChevronRight className="w-4 h-4 mr-2" />
          Next Player
        </Button>
      </div>
    );
  }
