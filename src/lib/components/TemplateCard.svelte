<script lang="ts">
  import type { Boilerplate } from '$lib/stores/boilerplates';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let boilerplate: Boilerplate;
  export let observer: IntersectionObserver;
  export let hideFeatures: boolean = false;

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
    goto(boilerplate.demoUrl);
  }

  $: cardClasses = `flex flex-col rounded-lg border-[1px] bg-white overflow-hidden cursor-pointer relative ${
    boilerplate.featured 
      ? 'border-slate-700/30 hover:border-slate-700/50' 
      : boilerplate.sponsored 
        ? 'border-emerald-200 hover:border-emerald-300'
        : 'border-slate-200 hover:border-slate-300'
  }`;
</script>

<a 
  href={boilerplate.demoUrl}
  class={cardClasses}
>
  <div class="flex-shrink-0 relative h-48 overflow-hidden bg-gray-100">
    <img 
      bind:this={imageRef}
      class="w-full h-full object-cover transition-opacity duration-300"
      data-src={boilerplate.image}
      src={boilerplate.image}
      draggable="false"
      alt={boilerplate.title}
      loading="lazy"
      onload="this.classList.remove('opacity-0')"
    />
  </div>
  <div class="flex-1 p-5 flex flex-col justify-between">
    <div class="flex-1">
      {#if boilerplate.featured || boilerplate.sponsored}
        <div class="flex gap-1 mb-2">
          {#if boilerplate.featured}
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700/90 text-slate-100 shadow-sm">
              Featured
            </span>
          {/if}
          {#if boilerplate.sponsored}
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 shadow-sm">
              Sponsored
            </span>
          {/if}
        </div>
      {/if}
      <div class="block">
        <p class="text-xl font-semibold text-gray-900 line-clamp-1">
          {boilerplate.title}
        </p>
        <p class="mt-2 text-base text-gray-500 line-clamp-2">
          {boilerplate.description}
        </p>
      </div>
    </div>
    {#if !hideFeatures && boilerplate.features?.length}
      <div class="mt-6 flex flex-wrap gap-2">
        {#each boilerplate.features.slice(0, 3) as feature}
          <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {feature}
          </span>
        {/each}
      </div>
    {/if}
  </div>
</a>

<style>
  div {
    will-change: transform;
    transform: translateZ(0);
  }
</style> 