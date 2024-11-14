import { Play, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

const MovesList: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-900 border border-gray-800 rounded-lg flex-grow mb-4">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Moves</h2>
          {/* Moves will be displayed here */}
        </div>
      </div>
      <div className="space-y-2">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          <Play className="w-4 h-4 mr-2" />
          Play Game
        </Button>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Game
        </Button>
      </div>
    </div>
  );
};

export default MovesList;
