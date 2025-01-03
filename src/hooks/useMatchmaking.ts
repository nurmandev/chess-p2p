/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from "react";

// Custom hook to manage matchmaking state and actions
export const useMatchmaking = () => {
  const [status, setStatus] = useState<string>("idle");
  const [match, setMatch] = useState<any>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerSide, setPlayerSide] = useState<'white' | 'black' | null>(null);
  const pollingInterval = useRef<NodeJS.Timeout>();

  // Function to find a match for a user
  const findMatch = async (userId: string) => {
    setStatus("searching");
    setMatch(null); // Reset match state immediately
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

  // Function to start polling for a match
  const startPolling = (userId: string) => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }

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
        } else if (data.status === "reset") {
          // Handle reset status
          setMatch(null);
          setStatus("searching");
          setRoomId(null);
          setPlayerSide(null);
          if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
          }
          // Restart matchmaking after a brief delay
          setTimeout(() => findMatch(userId), 1000);
        } else if (!data.match && status === "matched") {
          // If we were matched but now have no match, reset state
          setMatch(null);
          setStatus("searching");
          setRoomId(null);
          setPlayerSide(null);
          // Restart matchmaking
          findMatch(userId);
        }
      } catch (error) {
        console.error("Polling failed:", error);
      }
    }, 2000);
  };

  useEffect(() => {
    // Cleanup polling on unmount
    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, []);

  return { status, match, roomId, playerSide, findMatch };
};
