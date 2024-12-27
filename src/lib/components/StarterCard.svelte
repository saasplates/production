<script lang="ts">
  import type { Starter } from '$lib/stores/starters';
  
  export let starter: Starter;
</script>

<a 
  href={`/starters/${starter.id}`}
  class="flex flex-col rounded-lg border-[1px] border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors"
>
  <!-- 16:9 aspect ratio container -->
  <div class="relative w-full pt-[56.25%] bg-gray-100"> <!-- 56.25% = 9/16 -->
    <img
      src={starter.image}
      alt={starter.title}
      draggable="false"
      class="absolute top-0 left-0 w-full h-full object-cover"
      loading="lazy"
    />
  </div>

  <!-- Content section -->
  <div class="flex-1 p-6 border-t-[1px] border-slate-100">
    <!-- Tags section -->
    <div class="flex gap-2 mb-2">
      {#if starter.featured}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-blue-100 text-blue-800">
          Featured
        </span>
      {/if}
      {#if starter.sponsored}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-emerald-100 text-emerald-800">
          Sponsored
        </span>
      {/if}
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-purple-100 text-purple-800 capitalize">
        {starter.category}
      </span>
      {#if starter.price === 'Free'}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-green-100 text-green-800">
          Free
        </span>
      {:else}
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-amber-100 text-amber-800">
          Paid
        </span>
      {/if}
    </div>

    <div class="flex-1">
      <h3 class="text-xl font-semibold text-gray-900 line-clamp-1">
        {starter.title}
      </h3>
      <p class="mt-2 text-base text-gray-500 line-clamp-2">
        {starter.description}
      </p>
      {#if starter.price === 'Paid' && starter.priceAmount}
        <p class="mt-2 text-sm font-medium text-amber-600">
          {starter.priceAmount}
        </p>
      {/if}
    </div>
  </div>
</a>

<style>
  img {
    will-change: transform;
    transform: translateZ(0);
  }
</style> 