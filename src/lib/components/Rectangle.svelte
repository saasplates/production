<script lang="ts">
  import { goto } from '$app/navigation';
  import { trackInteraction } from '$lib/discord';

  export let url: string = 'https://0auth.example';
  export let title: string = 'Advertisement';
  export let description: string = 'Sponsored content';
  export let imgSrc: string | undefined = undefined;

  async function handleClick() {
    try {
      // Track click via API endpoint
      const response = await fetch('/api/track-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          elementId: `ad:${title}`,
        }),
      });

      const data = await response.json();
      const clickCount = data.clickCount || 'N/A';
      
      // Send to Discord webhook with click count
      await trackInteraction({
        page: window.location.pathname,
        element: 'rectangle-ad',
        action: 'clicked',
        additionalInfo: `Clicked promoted spot: ${title} - ${description}\nTotal Clicks: ${clickCount}`
      });
    } catch (error) {
      console.error('Error tracking click:', error);
      
      // Still track the click even if API call fails
      await trackInteraction({
        page: window.location.pathname,
        element: 'rectangle-ad',
        action: 'clicked',
        additionalInfo: `Clicked promoted spot: ${title} - ${description}`
      });
    }
  }
</script>

<a 
  href={url}
  class="block max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
  on:click={handleClick}
>
  <div class="p-4 flex flex-row justify-between items-center">
    <div class="flex flex-row items-center flex-grow">
      {#if imgSrc}
        <img
          src={imgSrc}
          loading="lazy"
          alt={title}
          draggable="false"
          class="w-8 h-8 rounded-full mr-3 object-cover"
        />
      {/if}
      <h3 class="text-md font-semibold text-gray-900">
        {title}
      </h3>
      <p class="ml-5 text-sm text-gray-500">
        {description}
      </p>
    </div>

    <div class="pr-4">
      <svg 
        class="w-5 h-5 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  </div>
</a> 