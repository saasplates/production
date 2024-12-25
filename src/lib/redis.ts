import { createClient } from 'redis';
import { browser } from '$app/environment';

// Initialize Redis client only on the server side
const client = browser ? null : createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

let isConnected = false;

if (!browser && client) {
  client.on('error', err => {
    console.error('Redis Client Error:', err);
    isConnected = false;
  });

  client.on('connect', () => {
    console.log('Connected to Redis');
    isConnected = true;
  });

  client.on('end', () => {
    console.log('Redis connection ended');
    isConnected = false;
  });
}

// Ensure client is connected
async function ensureConnection() {
  if (browser) return false;
  
  if (!isConnected && client) {
    try {
      await client.connect();
      isConnected = true;
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      return false;
    }
  }
  return isConnected;
}

// Rate limiting function
export async function checkRateLimit(ip: string, limit: number = 3): Promise<boolean> {
  if (browser) return true;
  
  try {
    const connected = await ensureConnection();
    if (!connected || !client) return true;
    
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
  if (browser) return 0;
  
  const key = `clicks:${elementId}`;
  
  try {
    const connected = await ensureConnection();
    if (!connected || !client) return 0;
    
    // Use multi to ensure atomicity
    const multi = client.multi();
    multi.incr(key);
    multi.expire(key, 30 * 24 * 60 * 60); // 30 days expiry
    const results = await multi.exec();
    return results[0] as number;
  } catch (error) {
    console.error('Redis error:', error);
    return 0;
  }
}

// Function to get click count without incrementing
export async function getClickCount(elementId: string): Promise<number> {
  if (browser) return 0;
  
  const key = `clicks:${elementId}`;
  
  try {
    const connected = await ensureConnection();
    if (!connected || !client) return 0;
    
    const count = await client.get(key);
    return count ? parseInt(count) : 0;
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
    
    if (keys.length > 0) {
      const pipeline = client.pipeline();
      keys.forEach(key => pipeline.get(key));
      const results = await pipeline.exec();
      
      keys.forEach((key, index) => {
        const count = results[index];
        counts[key.replace('clicks:', '')] = count ? Number(count) : 0;
      });
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
    try {
      await client.quit();
    } catch (error) {
      console.error('Error during Redis cleanup:', error);
    }
  }
});

// Handle process termination
process.on('SIGTERM', async () => {
  if (isConnected) {
    try {
      await client.quit();
    } catch (error) {
      console.error('Error during Redis cleanup:', error);
    }
  }
  process.exit(0);
});