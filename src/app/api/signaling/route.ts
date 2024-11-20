import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

const SIGNALING_KEY_PREFIX = "signaling:";

export async function POST(req: NextRequest) {
  try {
    const signal = await req.json();
    const recipientId = signal.data.recipientId;

    if (!recipientId) {
      return NextResponse.json(
        { error: "Recipient ID is required" },
        { status: 400 }
      );
    }

    const key = `${SIGNALING_KEY_PREFIX}${recipientId}`;
    await redis.rPush(key, JSON.stringify(signal));
    await redis.expire(key, 300); // 5 minutes TTL

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signaling error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const recipientId = req.nextUrl.searchParams.get("recipientId");

    if (!recipientId) {
      return NextResponse.json(
        { error: "Recipient ID is required" },
        { status: 400 }
      );
    }

    const key = `${SIGNALING_KEY_PREFIX}${recipientId}`;
    const messages = await redis.lRange(key, 0, -1);
    
    if (messages.length > 0) {
      await redis.del(key);
    }

    return NextResponse.json({
      messages: messages.map(msg => JSON.parse(msg))
    });
  } catch (error) {
    console.error("Error fetching signals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}