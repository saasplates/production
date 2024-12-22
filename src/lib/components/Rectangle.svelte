<script lang="ts">
  import { goto } from '$app/navigation';

  export let url: string = 'https://0auth.example';
  export let title: string = 'Advertisement';
  export let description: string = 'Sponsored content';
  export let imageUrl: string = '/ads/default.png';
</script>

<div 
  class="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-gray-300 transition-colors flex flex-row justify-between items-center"
  on:click={() => goto(url)}
>
  <div class="p-4 flex flex-row items-center flex-grow">
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