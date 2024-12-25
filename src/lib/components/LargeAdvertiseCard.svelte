<script lang="ts">
  import { trackInteraction } from '$lib/discord';
  import { trackClickAndGetCount } from '$lib/redis';
  
  export let image: string;
  export let href: string;
  export let title: string = "Advertisement";
  export let description: string = "Sponsored content";

  async function handleClick() {
    try {
      // Track click in Redis and get updated count
      const clickCount = await trackClickAndGetCount(`ad:${title}`);
      
      // Send to Discord webhook with click count
      await trackInteraction({
        page: window.location.pathname,
        element: 'large-ad-card',
        action: 'clicked',
        additionalInfo: `Clicked ad: ${title} - ${description}\nTotal Clicks: ${clickCount}`
      });
    } catch (error) {
      console.error('Error tracking ad click:', error);
      // Still track the click even if Redis fails
      await trackInteraction({
        page: window.location.pathname,
        element: 'large-ad-card',
        action: 'clicked',
        additionalInfo: `Clicked ad: ${title} - ${description}`
      }).catch(e => console.error('Failed to send to Discord:', e));
    }
  }
</script>

<a 
  href={href} 
  rel="noopener" 
  class="group block rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors overflow-hidden mx-auto max-w-3xl"
  on:click={handleClick}
>
  <div class="relative w-full bg-emerald-50 text-emerald-950">
    <div class="absolute left-4 top-3 z-10">
      <span class="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-white/90 rounded-full">
        Promoted
      </span>
    </div>
    
    <img 
      src={image} 
      draggable="false"
      loading="lazy"
      alt={title}
      class="w-full h-[200px] object-cover transition-transform duration-500" 
    />
  </div>

  <div class="p-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p class="text-sm text-gray-500">
      {description}
    </p>
  </div>
</a>

<!-- <a href={href} target="_blank" rel="noopener" class="group block bg-white rounded-2xl border border-gray-200 transition-colors overflow-hidden">
  <div class="relative w-full h-[auto] bg-emerald-50 text-emerald-950">
    <div class="relative left-4 py-1 flex gap-2 z-10 ">
        <span class="inline-flex items-center sm:px-2.5 py-0.5  text-xs font-semibold sm">
          Promoted
        </span>
      </div>
    <img 
      src={image} 
      draggable="false"
      alt={title}
      class="w-auto h-full transition-transform duration-500" 
    />
  </div>
</a>  -->
