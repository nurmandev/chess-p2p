/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useMatchmaking = () => {
  const [status, setStatus] = useState<string>("idle");
  const [match, setMatch] = useState<any>(null);

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
      } else {
        setStatus("waiting");
      }
    } catch (error) {
      console.error("Matchmaking failed:", error);
      setStatus("error");
    }
  };

  return { status, match, findMatch };
};
