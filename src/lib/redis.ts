import { createClient } from "redis";

// Create a Redis client with configuration from environment variables
const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 11071,
  },
});

// Handle Redis client errors
client.on("error", (err) => console.error("Redis Client Error:", err));

// Connect to Redis if not already connected
(async () => {
  if (!client.isOpen) {
    await client.connect();
  }
})();

export default client;
