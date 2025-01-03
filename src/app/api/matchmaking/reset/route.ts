import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    
    // Get current match data
    const matchKey = `match:${userId}`;
    const matchData = await client.hGetAll(matchKey);
    
    if (Object.keys(matchData).length > 0) {
      // Get the other player's ID
      const otherPlayerId = matchData.player1 === userId ? matchData.player2 : matchData.player1;
      
      // Set reset flag for the other player
      const resetKey = `reset:${otherPlayerId}`;
      await client.set(resetKey, "true", { EX: 30 }); // Expires in 30 seconds
      
      // Delete both players' match data
      await client.del(matchKey);
      await client.del(`match:${otherPlayerId}`);
      
      // Delete any existing signaling data
      await client.del(`signaling:${userId}`);
      await client.del(`signaling:${otherPlayerId}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Match reset error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 