import client from "./redis";

export interface Match {
  player1: string;
  player2: string;
}

/**
 * Add a user to the matchmaking queue.
 */
export async function addToQueue(userId: string): Promise<void> {
  await client.rPush("matchmaking_queue", userId);
}

/**
 * Retrieve the next opponent from the queue.
 */
export async function findOpponent(): Promise<string | null> {
  return await client.lPop("matchmaking_queue");
}

/**
 * Save the details of a match.
 */
export async function saveMatch(match: Match): Promise<void> {
  const matchKey = `match:${match.player1}`;
  await client.hSet(matchKey, {
    player1: match.player1,
    player2: match.player2,
  });
  await client.expire(matchKey, 3600); // Optional: Set a TTL of 1 hour
}

/**
 * Get the match data for a given user.
 */
export async function getMatch(userId: string): Promise<Match | null> {
  const matchKey = `match:${userId}`;
  const matchData = await client.hGetAll(matchKey);

  if (Object.keys(matchData).length === 0) return null;

  return {
    player1: matchData.player1,
    player2: matchData.player2,
  };
}
