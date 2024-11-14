import React from 'react';

interface VideoCallProps {
  player: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ player }) => {
  return (
    <div className="w-40 h-40 bg-gray-700 rounded-md flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-500 rounded-full mx-auto mb-2"></div>
        <p className="text-gray-400 text-sm">{player}</p>
      </div>
    </div>
  );
};

export default VideoCall;
