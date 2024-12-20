<script lang="ts">
  import type { Template } from '$lib/stores/templates';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let template: Template;
  export let observer: IntersectionObserver;

  let imageRef: HTMLImageElement;

  onMount(() => {
    if (imageRef && observer) {
      observer.observe(imageRef);
    }

    return () => {
      if (imageRef && observer) {
        observer.unobserve(imageRef);
      }
    };
  });

  function handleClick() {
    goto(template.demoUrl);
  }

  $: cardClasses = `flex flex-col rounded-lg border-[1px] bg-white overflow-hidden cursor-pointer relative ${
    template.featured 
      ? 'border-slate-700/30 hover:border-slate-700/50' 
      : template.sponsored 
        ? 'border-emerald-200 hover:border-emerald-300'
        : 'border-slate-200 hover:border-slate-300'
  }`;
</script>

<div 
  class={cardClasses}
  on:click={handleClick}
>
  <div class="flex-shrink-0 relative h-48 overflow-hidden bg-gray-100">
    {#if template.featured || template.sponsored}
      <div class="absolute top-4 left-4 flex gap-2 z-10">
        {#if template.featured}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-700/90 text-slate-100 shadow-sm backdrop-blur-sm">
            Featured
          </span>
        {/if}
        {#if template.sponsored}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 shadow-sm">
            Sponsored
          </span>
        {/if}
      </div>
    {/if}
    <img 
      bind:this={imageRef}
      class="w-full h-full object-cover transition-opacity duration-300 opacity-0"
      data-src={template.image}
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      alt={template.title}
    />
    <div class="absolute inset-0 bg-gray-200 animate-pulse" />
  </div>
  <div class="flex-1 p-6 flex flex-col justify-between">
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-600 uppercase tracking-wider">
        {template.category}
      </p>
      <div class="block mt-2">
        <p class="text-xl font-semibold text-gray-900">
          {template.title}
        </p>
        <p class="mt-3 text-base text-gray-500">
          {template.description}
        </p>
      </div>
    </div>
    <div class="mt-6 flex flex-wrap gap-2">
      {#each template.features.slice(0, 3) as feature}
        <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          {feature}
        </span>
      {/each}
    </div>
  </div>
</div>

<style>
  div {
    will-change: transform;
    transform: translateZ(0);
  }
</style> 