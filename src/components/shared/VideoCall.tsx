import { User } from "lucide-react";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useEffect, useRef } from "react";

// Component to display a video stream with a label
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
    <div className="w-full aspect-[4/3] min-h-[35vh] max-h-[40vh]">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={label === "You"}
        className="w-full h-full rounded-lg object-cover"
      />
    </div>
  );
}

// Placeholder component when no video stream is available
function PlayerPlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full aspect-[4/3] min-h-[35vh] max-h-[40vh] bg-gray-700 border border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
      <User className="w-1/3 h-1/3 text-gray-400" />
      <span className="mt-4 text-lg text-gray-400">{label}</span>
    </div>
  );
}

// Main VideoCall component managing local and remote streams
interface VideoCallProps {
  userId: string;
  remoteUserId: string | null;
  className?: string; // <-- Added this optional property
}

export default function VideoCall({ userId, remoteUserId, className }: VideoCallProps) {
  const { localStream, remoteStream } = useWebRTC(userId, remoteUserId);

  return (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      <VideoStream stream={localStream} label="You" />
      <VideoStream stream={remoteStream} label="Opponent" />
    </div>
  );
}
