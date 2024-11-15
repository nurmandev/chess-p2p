import { Play, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function MovesList() {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-700 border border-gray-600 rounded-lg flex-grow mb-4 p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-2">Moves</h2>
        {/* Moves will be displayed here */}
      </div>
      <Button className="mb-2 bg-green-600 hover:bg-green-700 text-white text-[2rem]">
        <Play className="mr-2" style={{ width: '32px', height: '32px' }}/>
        Play Match
      </Button>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-[2rem]">
        <Plus className="mr-2" style={{ width: '32px', height: '32px' }}/>
        New Match
      </Button>
    </div>
  );
}