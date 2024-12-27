<script lang="ts">
  import { starterStore, type Starter } from '$lib/stores/starters';
  import { fade } from 'svelte/transition';
  import TemplateCard from '$lib/components/TemplateCard.svelte';
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

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      Micro Starters
    </h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      Ready-to-use starter templates for specific functionalities like authentication, payments, and more.
      Just copy and integrate into your project.
    </p>
  </div>

  <!-- Search and Filter -->
  <div class="mb-8 space-y-4">
    <!-- Search Bar -->
    <div class="max-w-md mx-auto">
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
    <div class="flex flex-wrap justify-center gap-2">
      {#each categories as category}
        <button
          class="px-4 py-2 rounded-full text-sm font-medium
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
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredStarters as starter (starter.id)}
      <div in:fade={{ duration: 200 }}>
        <TemplateCard
          title={starter.title}
          description={starter.description}
          image={starter.image}
          framework={starter.framework}
          price={starter.price}
          priceAmount={starter.priceAmount}
          href={`/starters/${starter.id}`}
          featured={starter.featured}
          sponsored={starter.sponsored}
        />
      </div>
    {/each}
  </div>

  {#if filteredStarters.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-600">No starters found matching your criteria.</p>
    </div>
  {/if}

  <!-- <div class="mt-14">
    <LargeAdvertiseCard
      title="Footer Promotion Card"
      description="Buy this spot for $399 for 3 months."
      href="/advertise"
      image="/rectangle.webp"
    />
  </div> -->
</main> 