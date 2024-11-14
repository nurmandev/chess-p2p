// src/components/VideoCall.tsx
import { User, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function VideoCall() {
  return (
    <div className="w-full md:w-1/4 p-4 bg-gray-800 border-r border-gray-700 flex flex-col">
      <PlayerPlaceholder label="Figure 2" />
      <PlayerPlaceholder label="Figure 3" className="my-8" />
      <Button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white">
        <ChevronRight className="w-4 h-4 mr-2" />
        Next Player
      </Button>
    </div>
  );
}

function PlayerPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`bg-gray-700 border border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center aspect-[4/3] ${className}`}>
      <User className="w-1/3 h-1/3 text-gray-400" />
      <span className="mt-4 text-lg text-gray-400">{label}</span>
    </div>
  );
}
