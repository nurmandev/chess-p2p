import React from 'react';

interface VideoCallProps {
  player: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ player }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-48 h-32 bg-black rounded-md shadow-md mb-4 flex items-center justify-center">
        <p className="text-white text-sm">{player}&apos;s Video</p>
      </div>
    </div>
  );
};

export default VideoCall;
