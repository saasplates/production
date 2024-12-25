<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { trackInteraction } from '$lib/discord';
  import { trackClickAndGetCount } from '$lib/redis';
  
  const dispatch = createEventDispatcher();
  
  export let Frameworks = ['All', 'Next.js', 'Remix', 'Angular', 'Nuxt', 'SvelteKit', 'Laravel'];
  export let prices = ['Free', 'Paid'];
  export let activeFramework = 'All';
  export let activePrices = ['Free', 'Paid'];
  
  async function handleFilter(framework: string) {
    try {
      // Track click in Redis
      const clickCount = await trackClickAndGetCount(`filter:framework:${framework}`);
      
      // Send to Discord webhook
      await trackInteraction({
        page: window.location.pathname,
        element: 'framework-filter',
        action: 'clicked',
        additionalInfo: `Selected framework: ${framework}\nTotal Clicks: ${clickCount}`
      });
    } catch (error) {
      console.error('Error tracking framework filter click:', error);
    }

    activeFramework = framework;
    dispatch('filterFramework', { framework });
  }

  async function handlePriceFilter(price: string) {
    try {
      // Track click in Redis
      const clickCount = await trackClickAndGetCount(`filter:price:${price}`);
      
      // Send to Discord webhook
      await trackInteraction({
        page: window.location.pathname,
        element: 'price-filter',
        action: 'clicked',
        additionalInfo: `Selected price: ${price}\nTotal Clicks: ${clickCount}`
      });
    } catch (error) {
      console.error('Error tracking price filter click:', error);
    }

    if (activePrices.includes(price)) {
      if (activePrices.length > 1) {
        activePrices = [...activePrices.filter(p => p !== price)];
      }
    } else {
      activePrices = [...activePrices, price];
    }
    dispatch('filterPrice', { prices: activePrices });
  }
</script>

<div class="w-full mb-8">
  <div class="flex flex-row gap-8 items-start">
    <!-- Frameworks -->
    <div class="flex-1">
      <h3 class="text-sm font-medium text-gray-700 mb-2">Frameworks</h3>
      <div class="flex flex-wrap gap-2">
        {#each Frameworks as framework}
          <button
            class="px-4 py-2 text-sm rounded-full transition-colors {
              activeFramework === framework
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }"
            on:click={() => handleFilter(framework)}
          >
            {framework}
          </button>
        {/each}
      </div>
    </div>

    <!-- Price Filter -->
    <div class="min-w-[150px]">
      <h3 class="text-sm font-medium text-gray-700 mb-2">Price</h3>
      <div class="flex flex-wrap gap-2">
        {#each prices as price}
          <button
            class="px-4 py-2 text-sm rounded-full transition-colors inline-flex items-center gap-1.5 {
              activePrices.includes(price)
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }"
            on:click={() => handlePriceFilter(price)}
          >
            {#if activePrices.includes(price)}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            {/if}
            {price}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div> 