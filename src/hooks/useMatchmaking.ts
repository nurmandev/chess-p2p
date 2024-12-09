/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";

export const useMatchmaking = () => {
  const [status, setStatus] = useState<string>("idle");
  const [match, setMatch] = useState<any>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerSide, setPlayerSide] = useState<'white' | 'black' | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout>();

  const findMatch = async (userId: string) => {
    setStatus("searching");
    try {
      const response = await fetch("/api/matchmaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      
      if (data.match) {
        setMatch(data.match);
        setStatus("matched");
        setRoomId(data.match.roomId);
        setPlayerSide(data.match.playerSides[userId]);
      } else {
        setStatus("waiting");
        // Start polling for match
        startPolling(userId);
      }
    } catch (error) {
      console.error("Matchmaking failed:", error);
      setStatus("error");
    }
  };

  const startPolling = (userId: string) => {
    pollingInterval.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/matchmaking?userId=${userId}`);
        const data = await response.json();
        
        if (data.match) {
          setMatch(data.match);
          setStatus("matched");
          setRoomId(data.match.roomId);
          setPlayerSide(data.match.playerSides[userId]);
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
          }
        }
      } catch (error) {
        console.error("Polling failed:", error);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  return { status, match, roomId, playerSide, findMatch };
};
