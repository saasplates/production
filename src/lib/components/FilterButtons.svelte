<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let categories = ['All', 'Next.js', 'Remix', 'Svelte', 'Laravel', 'Free', 'Paid'];
  export let activeCategory = 'All';
  
  function handleFilter(category: string) {
    activeCategory = category;
    dispatch('filter', { category });
  }
</script>

<div class="w-full mb-8">
  <div class="flex flex-wrap gap-2">
    {#each categories as category}
      <button
        class="px-4 py-2 text-sm rounded-full transition-colors {
          activeCategory === category
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }"
        on:click={() => handleFilter(category)}
      >
        {category}
      </button>
    {/each}
  </div>
</div> 