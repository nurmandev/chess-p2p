import { NextRequest, NextResponse } from "next/server";
import { addToQueue, findOpponent, saveMatch, getMatch } from "@/lib/matchmaking";
import { v4 as uuidv4 } from 'uuid';
import { Match } from "@/lib/matchmaking"; // Assume Match type is defined here

// Handle POST requests to find or create a match
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    
    // Check if there's an available opponent
    const opponent = await findOpponent();
    
    if (opponent) {
      // Create a new match with the opponent
      const roomId = uuidv4();
      const match: Match = {
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
    
    // If no opponent is found, add the user to the matchmaking queue
    await addToQueue(userId);
    return NextResponse.json({ message: "Added to queue" });
  } catch (error) {
    console.error("Matchmaking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Handle GET requests to retrieve a user's match
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  const match = await getMatch(userId);
  return NextResponse.json({ match });
}
