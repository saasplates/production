<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let Frameworks = ['All', 'Next.js', 'Remix', 'SvelteKit', 'Laravel'];
  export let prices = ['Free', 'Paid'];
  export let activeFramework = 'All';
  export let activePrice = 'Free';
  
  function handleFilter(framework: string) {
    activeFramework = framework;
    dispatch('filterFramework', { framework });
  }

  function handlePriceFilter(price: string) {
    activePrice = price;
    dispatch('filterPrice', { price });
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
            class="px-4 py-2 text-sm rounded-full transition-colors {
              activePrice === price
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }"
            on:click={() => handlePriceFilter(price)}
          >
            {price}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div> 