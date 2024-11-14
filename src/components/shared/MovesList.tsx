// src/components/MovesList.tsx
import { Play, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function MovesList() {
  return (
    <div className="w-full md:w-1/4 p-4 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="bg-gray-700 border border-gray-600 rounded-lg flex-grow mb-4 p-4">
        <h2 className="text-lg font-semibold mb-2">Moves</h2>
        {/* Moves will be displayed here */}
      </div>
      <Button className="mb-2 bg-green-600 hover:bg-green-700 text-white">
        <Play className="w-4 h-4 mr-2" />
        Play Match
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus className="w-4 h-4 mr-2" />
        New Match
      </Button>
    </div>
  );
}
