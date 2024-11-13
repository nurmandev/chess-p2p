import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/redis";

interface Match {
  player1: string;
  player2: string;
}

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const waitingUserId = await client.lPop("matchmaking_queue");

    if (waitingUserId) {
      const match: Match = { player1: waitingUserId, player2: userId };

      await client.hSet(`match:${userId}`, {
        player1: match.player1,
        player2: match.player2,
      });

      return NextResponse.json({ match });
    } else {
      await client.rPush("matchmaking_queue", userId);
      return NextResponse.json({ message: "Waiting for an opponent..." });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
