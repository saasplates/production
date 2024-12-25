import { json } from '@sveltejs/kit';
import { trackClickAndGetCount } from '$lib/redis';

export async function POST({ request }) {
  try {
    const { elementId } = await request.json();
    
    if (!elementId) {
      return json({ error: 'Element ID is required' }, { status: 400 });
    }

    const clickCount = await trackClickAndGetCount(elementId);
    
    return json({ clickCount });
  } catch (error) {
    console.error('Error tracking click:', error);
    return json({ error: 'Failed to track click' }, { status: 500 });
  }
}

export async function GET({ url }) {
  try {
    const elementId = url.searchParams.get('elementId');
    
    if (!elementId) {
      return json({ error: 'Element ID is required' }, { status: 400 });
    }

    const clickCount = await trackClickAndGetCount(elementId);
    
    return json({ clickCount });
  } catch (error) {
    console.error('Error getting click count:', error);
    return json({ error: 'Failed to get click count' }, { status: 500 });
  }
} 