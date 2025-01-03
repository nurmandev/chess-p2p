/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useCallback } from 'react';
import { pollSignals, sendSignal } from '@/lib/signaling';
import { turnServerConfig } from '@/config/turnServerConfig';

// Configuration for ICE servers including TURN servers
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: "stun:stun.relay.metered.ca:80",
    },
    ...turnServerConfig
  ]
};

// Custom hook to manage WebRTC connections
export function useWebRTC(userId: string, remoteUserId: string | null) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout>();

  const isInitiator = useRef(false);
  const hasRemoteDescription = useRef(false);
  const pendingCandidates = useRef<RTCIceCandidate[]>([]);

  const resetConnection = useCallback(() => {
    // Close and cleanup peer connection
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    // Clear remote stream
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => {
        track.stop();
        remoteStream.removeTrack(track);
      });
      setRemoteStream(null);
    }

    // Reset flags
    isInitiator.current = false;
    hasRemoteDescription.current = false;
    pendingCandidates.current = [];

    // Clear polling interval
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = undefined;
    }
  }, [remoteStream]);

  // Effect for handling remoteUserId changes
  useEffect(() => {
    if (!remoteUserId) {
      resetConnection();
      return;
    }

    // Reset existing connection before setting up new one
    resetConnection();

    // Small delay before setting up new connection
    const timer = setTimeout(() => {
      if (localStream) {
        setupPeerConnection();
        startPolling();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      resetConnection();
    };
  }, [remoteUserId, localStream]);

  // Setup local media stream
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
      if (localStream) {
        localStream.getTracks().forEach(track => {
          track.stop();
          localStream.removeTrack(track);
        });
        setLocalStream(null);
      }
      resetConnection();
    };
  }, []);

  // Function to setup peer connection
  const setupPeerConnection = useCallback(() => {
    if (!remoteUserId || !localStream) return;

    peerConnection.current = new RTCPeerConnection(configuration);
    const pc = peerConnection.current;

    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      setRemoteStream(prevStream => {
        if (!prevStream) {
          return new MediaStream([event.track]);
        } else {
          prevStream.addTrack(event.track);
          return prevStream;
        }
      });
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

    // Determine who initiates the connection
    isInitiator.current = userId < remoteUserId;
    
    if (isInitiator.current) {
      startSignaling();
    }
  }, [remoteUserId, localStream, userId]);

  // Function to initiate signaling by creating an offer
  async function startSignaling() {
    if (!peerConnection.current || !remoteUserId) return;

    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      await sendSignal({
        type: 'offer',
        senderId: userId,
        data: { offer, recipientId: remoteUserId }
      });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }

  // Function to poll for incoming signaling messages
  async function startPolling() {
    pollingInterval.current = setInterval(async () => {
      try {
        const messages = await pollSignals(userId);
        
        for (const message of messages) {
          if (!peerConnection.current) continue;

          if (message.type === 'offer') {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.data.offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            
            await sendSignal({
              type: 'answer',
              senderId: userId,
              data: { answer, recipientId: message.senderId }
            });

            // Apply any pending candidates
            for (const candidate of pendingCandidates.current) {
              await peerConnection.current.addIceCandidate(candidate);
            }
            pendingCandidates.current = [];

          } else if (message.type === 'answer') {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(message.data.answer));
            hasRemoteDescription.current = true;

            // Apply any pending candidates
            for (const candidate of pendingCandidates.current) {
              await peerConnection.current.addIceCandidate(candidate);
            }
            pendingCandidates.current = [];

          } else if (message.type === 'candidate') {
            const candidate = new RTCIceCandidate(message.data.candidate);
            
            if (peerConnection.current.remoteDescription && peerConnection.current.remoteDescription.type) {
              await peerConnection.current.addIceCandidate(candidate);
            } else {
              // Store candidate for later if remote description isn't set yet
              pendingCandidates.current.push(candidate);
            }
          }
        }
      } catch (error) {
        console.error('Error in polling:', error);
      }
    }, 1000);
  }

  return { localStream, remoteStream, resetConnection };
}
