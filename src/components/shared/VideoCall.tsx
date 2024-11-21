import { User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useEffect, useRef } from "react";

function VideoStream({
  stream,
  label,
}: {
  stream: MediaStream | null;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return <PlayerPlaceholder label={label} />;
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={label === "You"}
      className="w-full aspect-[4/3] rounded-lg object-cover"
    />
  );
}

function PlayerPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center aspect-[4/3] w-full">
      <User className="w-1/3 h-1/3 text-gray-400" />
      <span className="mt-4 text-lg text-gray-400">{label}</span>
    </div>
  );
}

export default function VideoCall({
  userId,
  remoteUserId,
}: {
  userId: string;
  remoteUserId: string | null;
}) {
  const { localStream, remoteStream } = useWebRTC(userId, remoteUserId);

  return (
    <div className="flex flex-col justify-between space-y-4 h-full">
      <VideoStream stream={localStream} label="You" />
      <VideoStream stream={remoteStream} label="Opponent" />
      <Button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white aspect-square lg:aspect-auto w-full text-[2rem]">
        <ChevronRight
          className="mr-2"
          style={{ width: "32px", height: "32px" }}
        />
        <span className="hidden lg:inline">Next Player</span>
      </Button>
    </div>
  );
}
