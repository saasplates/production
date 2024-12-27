<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let Frameworks = ['All', 'Next.js', 'Remix', 'Angular', 'Nuxt', 'SvelteKit', 'Laravel'];
  export let prices = ['Free', 'Paid'];
  export let activeFramework = 'All';
  export let activePrices = ['Free', 'Paid'];
  export let activeView: 'boilerplates' | 'starters' = 'boilerplates';
  
  function handleFilter(value: string) {
    activeFramework = value;
    dispatch('filterFramework', { framework: value });
  }

  function handlePriceFilter(price: string) {
    if (activePrices.includes(price)) {
      if (activePrices.length > 1) {
        activePrices = [...activePrices.filter(p => p !== price)];
      }
    } else {
      activePrices = [...activePrices, price];
    }
    dispatch('filterPrice', { prices: activePrices });
  }

  function handleViewChange(view: 'boilerplates' | 'starters') {
    activeView = view;
    dispatch('viewChange', { view });
  }

  const technologies = [
    { id: 'all', name: 'All Technologies' },
    { id: 'nextjs', name: 'Next.js' },
    { id: 'stripe', name: 'Stripe' },
    { id: 'nextauth', name: 'NextAuth.js' },
    { id: 'clerk', name: 'Clerk' },
    { id: 'supabase', name: 'Supabase' },
    { id: 'postgresql', name: 'PostgreSQL' }
  ];
</script>

<div class="w-full mb-8">
  <!-- View Toggle -->
  <div class="mb-6">
    <div class="flex justify-center gap-[1px] mb-4 border border-gray-200 rounded-full p-1 bg-gray-50 inline-flex">
      <button
        class="px-6 py-2 text-sm font-medium rounded-full transition-colors {
          activeView === 'boilerplates'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }"
        on:click={() => handleViewChange('boilerplates')}
      >
        Boilerplates
      </button>
      <button
        class="px-6 py-2 text-sm font-medium rounded-full transition-colors {
          activeView === 'starters'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }"
        on:click={() => handleViewChange('starters')}
      >
        Starters
      </button>
    </div>
  </div>

  <div class="flex flex-row gap-8 items-start">
    <!-- Frameworks/Technologies -->
    <div class="flex-1">
      {#if activeView === 'boilerplates'}
        <!-- Framework Filter -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Frameworks</h3>
          <div class="border border-gray-200 rounded-full p-1 bg-gray-50 inline-flex flex-wrap gap-[1px]">
            {#each Frameworks as framework}
              <button
                class="px-4 py-2 text-sm font-medium rounded-full transition-colors {
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
      {:else}
        <!-- Technology Filter -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Technologies</h3>
          <div class="border border-gray-200 rounded-full p-1 bg-gray-50 inline-flex flex-wrap gap-[1px]">
            {#each technologies as tech}
              <button
                class="px-4 py-2 text-sm font-medium rounded-full transition-colors {
                  activeFramework === tech.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }"
                on:click={() => handleFilter(tech.id)}
              >
                {tech.name}
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Price Filter - Only show for Boilerplates -->
    {#if activeView === 'boilerplates'}
      <div class="min-w-[150px]">
        <h3 class="text-sm font-medium text-gray-700 mb-2">Price</h3>
        <div class="border border-gray-200 rounded-full p-1 bg-gray-50 inline-flex gap-[1px]">
          {#each prices as price}
            <button
              class="px-4 py-2 text-sm font-medium rounded-full transition-colors inline-flex items-center gap-1.5 {
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
    {/if}
  </div>
</div> 