<script lang="ts">
  import { goto } from '$app/navigation';

  export let url: string = 'https://0auth.example';
  export let title: string = 'Advertisement';
  export let description: string = 'Sponsored content';
  export let imgSrc: string | undefined = undefined;
</script>

<a 
  href={url}
  class="block max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
>
  <div class="p-4 flex flex-row justify-between items-center">
    <div class="flex flex-row items-center flex-grow">
      {#if imgSrc}
        <img
          src={imgSrc}
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