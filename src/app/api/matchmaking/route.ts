import { NextRequest, NextResponse } from "next/server";
import { addToQueue, findOpponent, saveMatch, getMatch } from "@/lib/matchmaking";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    
    // First check if there's an opponent
    const opponent = await findOpponent();
    
    if (opponent) {
      // If found an opponent, create a match
      const match = { player1: opponent, player2: userId };
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
