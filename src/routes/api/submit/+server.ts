import { json } from '@sveltejs/kit';
import { checkRateLimit } from '$lib/redis';
import { sendToDiscord } from '$lib/discord';

export async function POST({ request, getClientAddress }) {
  try {
    const ip = getClientAddress();
    const canProceed = await checkRateLimit(ip);

    if (!canProceed) {
      return json({
        success: false,
        message: 'Rate limit exceeded. Please try again in 24 hours.'
      }, { status: 429 });
    }

    const data = await request.json();
    await sendToDiscord('submit', data);

    return json({ success: true });
  } catch (error) {
    console.error('Submit error:', error);
    return json({ 
      success: false, 
      message: 'An error occurred while processing your submission.' 
    }, { status: 500 });
  }
} 