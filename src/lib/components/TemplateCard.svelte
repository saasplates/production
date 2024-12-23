<script lang="ts">
  import type { Boilerplate } from '$lib/stores/boilerplates';
  
  export let boilerplate: Boilerplate;
  export let observer: IntersectionObserver | null = null;
  export let hideFeatures = false;
</script>

<a 
  href={boilerplate.demoUrl}
  class="flex flex-col h-[22rem] rounded-lg border-[1px] border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors"
>
  <!-- 16:9 aspect ratio container -->
  <div class="relative w-full pt-[56.25%] bg-gray-100"> <!-- 56.25% = 9/16 -->
    <img
      src={boilerplate.image}
      alt={boilerplate.title}
      class="absolute top-0 left-0 w-full h-full object-cover"
      loading="lazy"
    />
    {#if boilerplate.featured}
      <div class="absolute top-4 left-4 flex gap-2 z-10">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
          Featured
        </span>
      </div>
    {/if}
    {#if boilerplate.sponsored}
      <div class="absolute top-4 left-4 flex gap-2 z-10">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800">
          Sponsored
        </span>
      </div>
    {/if}
  </div>

  <!-- Content section -->
  <div class="flex-1 p-6">
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-gray-900 line-clamp-1">
        {boilerplate.title}
      </h3>
      <p class="mt-2 text-base text-gray-500 line-clamp-2">
        {boilerplate.description}
      </p>
    </div>
    
    {#if !hideFeatures && boilerplate.features?.length}
      <div class="mt-4 flex flex-wrap gap-2">
        {#each boilerplate.features.slice(0, 3) as feature}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
            {feature}
          </span>
        {/each}
      </div>
    {/if}
  </div>
</a>

<style>
  img {
    will-change: transform;
    transform: translateZ(0);
  }
</style> 