let client: any;
let checkRateLimit: (ip: string, limit?: number) => Promise<boolean>;

// Only import Redis in server environment
if (typeof process !== 'undefined') {
  try {
    const { createClient } = require('redis');
    client = createClient({
      url: process.env.REDIS_URL
    });

    client.on('error', (err: Error) => console.error('Redis Client Error', err));

    checkRateLimit = async (ip: string, limit: number = 3): Promise<boolean> => {
      try {
        await client.connect();
        const key = `ratelimit:${ip}`;
        const requests = await client.incr(key);
        
        if (requests === 1) {
          await client.expire(key, 24 * 60 * 60); // 24 hours
        }
        
        return requests <= limit;
      } catch (error) {
        console.error('Rate limit check failed:', error);
        return true; // Allow request if rate limiting fails
      } finally {
        await client.disconnect();
      }
    };
  } catch (error) {
    console.warn('Redis not available, using mock implementation');
    // Mock implementation when Redis is not available
    checkRateLimit = async () => true;
  }
} else {
  // Client-side mock
  checkRateLimit = async () => true;
}

export { checkRateLimit };
export default client;