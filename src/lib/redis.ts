import { createClient } from 'redis';

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 11071
    }
});

client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await client.connect();
})();

export default client;