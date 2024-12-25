import { createClient } from 'redis';

// Initialize Redis client
const client = createClient({
  socket: {
    host: 'redis',
    port: 6379
  }
});

client.on('error', err => console.error('Redis Client Error:', err));
client.on('connect', () => console.log('Connected to Redis'));

// Ensure client is connected
let isConnected = false;
async function ensureConnection() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
}

// Rate limiting function
export async function checkRateLimit(ip: string, limit: number = 3): Promise<boolean> {
  try {
    await ensureConnection();
    const key = `ratelimit:${ip}`;
    const requests = await client.incr(key);
    
    if (requests === 1) {
      await client.expire(key, 24 * 60 * 60); // 24 hours expiry
    }
    
    return requests <= limit;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return true; // Allow request if rate limiting fails
  }
}

// Function to increment click count and get total clicks
export async function trackClickAndGetCount(elementId: string): Promise<number> {
  const key = `clicks:${elementId}`;
  
  try {
    await ensureConnection();
    // Increment the click count and get the new value
    const newCount = await client.incr(key);
    return newCount;
  } catch (error) {
    console.error('Redis error:', error);
    return 0;
  }
}

// Function to get click count without incrementing
export async function getClickCount(elementId: string): Promise<number> {
  const key = `clicks:${elementId}`;
  
  try {
    await ensureConnection();
    const count = await client.get(key);
    return count ? Number(count) : 0;
  } catch (error) {
    console.error('Redis error:', error);
    return 0;
  }
}

// Function to get all click counts
export async function getAllClickCounts(): Promise<Record<string, number>> {
  try {
    await ensureConnection();
    const keys = await client.keys('clicks:*');
    const counts: Record<string, number> = {};
    
    for (const key of keys) {
      const count = await client.get(key);
      counts[key.replace('clicks:', '')] = count ? Number(count) : 0;
    }
    
    return counts;
  } catch (error) {
    console.error('Redis error:', error);
    return {};
  }
}

// Cleanup on process exit
process.on('exit', async () => {
  if (isConnected) {
    await client.quit();
  }
});