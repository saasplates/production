<script lang="ts">
  import { starterStore, type Starter } from '$lib/stores/starters';
  import { fade } from 'svelte/transition';
  import StarterCard from '$lib/components/StarterCard.svelte';
  import LargeAdvertiseCard from '$lib/components/LargeAdvertiseCard.svelte';

  let selectedCategory: string = 'all';
  let searchQuery: string = '';

  $: filteredStarters = $starterStore.filter((starter) => {
    const matchesCategory = selectedCategory === 'all' || starter.category === selectedCategory;
    const matchesSearch = starter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         starter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         starter.framework.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Starters' },
    { id: 'auth', name: 'Authentication' },
    { id: 'payment', name: 'Payments' },
    { id: 'database', name: 'Database' },
    { id: 'api', name: 'API' },
    { id: 'ui', name: 'UI Components' },
    { id: 'testing', name: 'Testing' }
  ];
</script>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
  <div class="text-center mb-8 sm:mb-12">
    <h1 class="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
      Micro Starters
    </h1>
    <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      Ready-to-use starter templates for specific functionalities like authentication, payments, and more.
      Just copy and integrate into your project.
    </p>
  </div>

  <!-- Search and Filter -->
  <div class="mb-6 sm:mb-8 space-y-4">
    <!-- Search Bar -->
    <div class="max-w-md mx-auto px-2 sm:px-0">
      <div class="relative">
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search starters..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <svg
          class="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap justify-center gap-2 px-2 sm:px-0">
      {#each categories as category}
        <button
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium whitespace-nowrap
                 {selectedCategory === category.id
                   ? 'bg-blue-100 text-blue-800'
                   : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
          on:click={() => selectedCategory = category.id}
        >
          {category.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Starters Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {#each filteredStarters as starter (starter.id)}
      <div in:fade={{ duration: 200 }}>
        <StarterCard starter={starter} />
      </div>
    {/each}
  </div>

  {#if filteredStarters.length === 0}
    <div class="text-center py-8 sm:py-12">
      <p class="text-gray-600">No starters found matching your criteria.</p>
    </div>
  {/if}
</main> 