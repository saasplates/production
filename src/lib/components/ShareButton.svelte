<script lang="ts">
  export let url = '';
  export let title = '';
  export let compact = false;
  
  let showTooltip = false;
  let tooltipTimeout: NodeJS.Timeout;

  // Import fade transition
  import { fade } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  function share() {
    // Always copy to clipboard
    navigator.clipboard.writeText(url || window.location.href);
    showTooltip = true;
    
    // Clear any existing timeout
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
    
    // Hide tooltip after 2 seconds
    tooltipTimeout = setTimeout(() => {
      showTooltip = false;
    }, 2000);
  }

  // Clean up timeout on component destruction
  onDestroy(() => {
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
  });
</script>

<div class="relative inline-block">
  <button
    on:click={share}
    class={`inline-flex items-center ${compact ? 'p-2' : 'px-4 py-2'} border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {compact ? '' : 'mr-2'}" viewBox="0 0 20 20" fill="currentColor">
      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
    {#if !compact}
      Share
    {/if}
  </button>

  {#if showTooltip}
    <div 
      class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm"
      transition:fade={{ duration: 150 }}
    >
      Copied to clipboard!
      <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
    </div>
  {/if}
</div>

<style>
  .absolute {
    z-index: 50;
  }
</style> 