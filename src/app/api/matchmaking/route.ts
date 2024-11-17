import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/redis";

interface Match {
  player1: string;
  player2: string;
}

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    // Check if the user is already in the matchmaking queue
    const queue = await client.lRange("matchmaking_queue", 0, -1);
    if (queue.includes(userId)) {
      return NextResponse.json({ message: "You are already in the queue" });
    }

    // Pop a user from the queue
    const opponentId = await client.lPop("matchmaking_queue");

    if (opponentId) {
      // If there's an opponent, create a match
      const match: Match = { player1: opponentId, player2: userId };

      // Store the match in Redis with a TTL
      const matchId = `match:${userId}`;
      await client.hSet(matchId, {
        player1: match.player1,
        player2: match.player2,
      });
      await client.expire(matchId, 3600); // Set TTL to 1 hour

      return NextResponse.json({ match });
    } else {
      // Otherwise, add the user to the queue
      await client.rPush("matchmaking_queue", userId);
      return NextResponse.json({ message: "Waiting for an opponent..." });
    }
  } catch (error) {
    console.error("Matchmaking error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
