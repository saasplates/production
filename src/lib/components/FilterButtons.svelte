<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  export let Frameworks = ['All', 'Next.js', 'Remix', 'Angular', 'Nuxt', 'SvelteKit', 'Laravel'];
  export let prices = ['Free', 'Paid'];
  export let activeFramework = 'All';
  export let activePrices = ['Free', 'Paid'];
  export let activeView: 'boilerplates' | 'starters' = 'boilerplates';
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'auth', name: 'Authentication' },
    { id: 'payment', name: 'Payments' },
    { id: 'database', name: 'Database' },
    { id: 'testing', name: 'Testing' }
  ];

  function handleFilter(value: string) {
    document.startViewTransition(() => {
      activeFramework = value;
      dispatch('filterFramework', { framework: value });
    });
  }

  function handlePriceFilter(price: string) {
    document.startViewTransition(() => {
      if (activePrices.includes(price)) {
        if (activePrices.length > 1) {
          activePrices = [...activePrices.filter(p => p !== price)];
        }
      } else {
        activePrices = [...activePrices, price];
      }
      dispatch('filterPrice', { prices: activePrices });
    });
  }

  function handleViewChange(view: 'boilerplates' | 'starters') {
    document.startViewTransition(() => {
      activeView = view;
      dispatch('viewChange', { view });
    });
  }
</script>

<div class="w-full mb-8">
  <!-- View Toggle -->
  <div class="mb-6">
    <div class="flex justify-center gap-[1px] mb-4 border border-gray-200 rounded-[24px] p-1 bg-gray-100 inline-flex">
      <button
        class="px-4 sm:px-6 py-2 text-sm font-medium rounded-[20px] transition-all duration-200 ease-in-out {
          activeView === 'boilerplates'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:text-gray-900'
        }"
        on:click={() => handleViewChange('boilerplates')}
      >
        Boilerplates
      </button>
      <button
        class="px-4 sm:px-6 py-2 text-sm font-medium rounded-[20px] transition-all duration-200 ease-in-out {
          activeView === 'starters'
            ? 'bg-gray-900 text-white'
            : 'text-gray-700 hover:text-gray-900'
        }"
        on:click={() => handleViewChange('starters')}
      >
        Starters
      </button>
    </div>
  </div>

  <div class="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start">
    <!-- Frameworks/Technologies -->
    <div class="w-full sm:flex-1">
      {#if activeView === 'boilerplates'}
        <!-- Framework Filter -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Frameworks</h3>
          <div class="border border-gray-200 rounded-[16px] sm:rounded-[24px] p-1.5 bg-gray-100 flex flex-wrap gap-1">
            {#each Frameworks as framework}
              <button
                class="px-3 sm:px-4 py-2 text-sm font-medium rounded-[12px] sm:rounded-[20px] transition-all duration-200 ease-in-out {
                  activeFramework === framework
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }"
                on:click={() => handleFilter(framework)}
              >
                {framework}
              </button>
            {/each}
          </div>
        </div>
      {:else}
        <!-- Categories Filter -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Categories</h3>
          <div class="border border-gray-200 rounded-[16px] sm:rounded-[24px] p-1.5 bg-gray-100 flex flex-wrap gap-1">
            {#each categories as category}
              <button
                class="px-3 sm:px-4 py-2 text-sm font-medium rounded-[12px] sm:rounded-[20px] transition-all duration-200 ease-in-out {
                  activeFramework === category.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }"
                on:click={() => handleFilter(category.id)}
              >
                {category.name}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Price Filter -->
    {#if activeView === 'boilerplates'}
      <div class="w-full sm:w-auto">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Price</h3>
        <div class="border border-gray-200 rounded-[24px] p-1.5 bg-gray-100 flex gap-1.5">
          {#each prices as price}
            <button
              class="flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-[20px] transition-all duration-200 ease-in-out inline-flex items-center justify-center gap-2 {
                activePrices.includes(price)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:text-gray-900'
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
    {/if}
  </div>
</div>
