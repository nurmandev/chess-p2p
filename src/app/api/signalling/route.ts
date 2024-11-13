/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

type SignalMessage = {
  type: "offer" | "answer" | "candidate";
  senderId: string;
  data: any;
};

const SIGNALING_KEY_PREFIX = "signaling: ";

export async function POST(req: NextRequest) {
  try {
    const { type, senderId, data } = (await req.json()) as SignalMessage;
    const recipientId = data.recipientId;

    if (!recipientId) {
      return NextResponse.json(
        { error: "Recipient ID is required" },
        { status: 400 }
      );
    }

    const key = `${SIGNALING_KEY_PREFIX}${recipientId}`;

    await redis.rPush(key, JSON.stringify({ type, senderId, data }));

    return NextResponse.json({
      message: "Signaling message stored sucessfully",
    });
  } catch (error) {
    console.error("Error in signaling route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const recipientId = req.nextUrl.searchParams.get("recipientId");

  if (!recipientId) {
    return NextResponse.json(
      { error: "Recipient ID is required" },
      { status: 400 }
    );
  }

  const key = `${SIGNALING_KEY_PREFIX}${recipientId}`;

  const messages = await redis.lRange(key, 0, -1);

  await redis.del(key);

  const parsedMessages = messages.map((message) => JSON.parse(message));

  return NextResponse.json({ message: parsedMessages });
}
