import { useEffect, useRef, useState } from 'react';
import { pollSignals, sendSignal } from '@/lib/signaling';

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

export function useWebRTC(userId: string, remoteUserId: string | null) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    async function setupMediaStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    }
    setupMediaStream();

    return () => {
      localStream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!remoteUserId || !localStream) return;

    peerConnection.current = new RTCPeerConnection(configuration);
    const pc = peerConnection.current;

    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      setRemoteStream(new MediaStream([event.track]));
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({
          type: 'candidate',
          senderId: userId,
          data: { candidate: event.candidate, recipientId: remoteUserId }
        });
      }
    };

    startSignaling();
    startPolling();

    return () => {
      pc.close();
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [remoteUserId, localStream, userId]);

  async function startSignaling() {
    if (!peerConnection.current || !remoteUserId) return;

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    await sendSignal({
      type: 'offer',
      senderId: userId,
      data: { offer, recipientId: remoteUserId }
    });
  }

  async function startPolling() {
    pollingInterval.current = setInterval(async () => {
      const messages = await pollSignals(userId);
      
      for (const message of messages) {
        if (!peerConnection.current) continue;

        if (message.type === 'offer') {
          await peerConnection.current.setRemoteDescription(message.data.offer);
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          await sendSignal({
            type: 'answer',
            senderId: userId,
            data: { answer, recipientId: message.senderId }
          });
        } else if (message.type === 'answer') {
          await peerConnection.current.setRemoteDescription(message.data.answer);
        } else if (message.type === 'candidate') {
          await peerConnection.current.addIceCandidate(message.data.candidate);
        }
      }
    }, 1000);
  }

  return { localStream, remoteStream };
}
