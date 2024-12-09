import { NextRequest, NextResponse } from "next/server";
import { addToQueue, findOpponent, saveMatch, getMatch } from "@/lib/matchmaking";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    
    // First check if there's an opponent
    const opponent = await findOpponent();
    
    if (opponent) {
      const roomId = uuidv4();
      const match = {
        player1: opponent,
        player2: userId,
        roomId,
        playerSides: {
          [opponent]: 'white',
          [userId]: 'black',
        },
      };
      await saveMatch(match);
      return NextResponse.json({ match });
    }
    
    // If no opponent found, add user to queue
    await addToQueue(userId);
    return NextResponse.json({ message: "Added to queue" });
  } catch (error) {
    console.error("Matchmaking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const match = await getMatch(userId);
  return NextResponse.json({ match });
}
