<script lang="ts">
  export let data;
  const { starter } = data;
  import { scrollPosition } from '$lib/stores/scroll';
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import ShareButton from '$lib/components/ShareButton.svelte';
  import { goto } from '$app/navigation';

  let imageLoaded = false;
  let imgElement: HTMLImageElement;

  onMount(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    imageLoaded = false;
    
    if (imgElement?.complete) {
      imageLoaded = true;
    }
  });

  function handleBackClick() {
    try {
      scrollPosition.set(window.scrollY);
      
      const currentLength = window.history.length;
      history.back();
      
      setTimeout(() => {
        if (window.history.length === currentLength) {
          const url = new URL(window.location.href);
          const framework = url.searchParams.get('framework') || 'all';
          const prices = url.searchParams.get('prices') || 'Free,Paid';
          goto(`/?view=starters&framework=${framework}&prices=${prices}`);
        }
      }, 100);
    } catch (e) {
      goto('/?view=starters');
    }
  }

  function onImageLoad() {
    imageLoaded = true;
  }
</script>

{#if starter}
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-24">
    <!-- Back and Share Button - Always visible -->
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <a 
        href="#"
        on:click|preventDefault={handleBackClick}
        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
      >
        <svg 
          class="w-4 h-4 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Homepage
      </a>
      <ShareButton title={starter.title} />
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <!-- Main Content First on Mobile -->
      <div class="flex-1 space-y-6">
        <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
          {#if !imageLoaded}
            <div class="absolute inset-0 animate-pulse bg-gray-100" />
          {/if}
          <img
            bind:this={imgElement}
            src={starter.mainImage || starter.image}
            alt={starter.title}
            draggable="false"
            on:load={onImageLoad}
            class="w-full h-full object-cover rounded-lg border border-slate-200 transition-opacity duration-300"
            class:opacity-0={!imageLoaded}
            class:opacity-100={imageLoaded}
          />
        </div>

        <!-- Title on Mobile -->
        <div class="lg:hidden">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            {starter.title}
          </h1>
        </div>

        <!-- Description -->
        <div class="prose max-w-none">
          <h2 class="text-xl font-semibold mb-4">Description</h2>
          <p class="text-gray-600">
            {starter.description}
          </p>
        </div>

        <!-- Features Section -->
        {#if starter.features}
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each starter.features as feature}
                <div class="p-4 rounded-lg border border-gray-200 bg-white">
                  <h3 class="font-medium text-gray-900">{feature.title}</h3>
                  <p class="text-sm text-gray-600">{feature.description}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Children Section -->
        {#if starter.children}
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Additional Information</h2>
            <div class="grid grid-cols-1 gap-4">
              {#each starter.children as child}
                <div class="p-6 rounded-lg border border-gray-200 bg-white">
                  {#if child.icon}
                    <div class="flex items-center gap-3 mb-3">
                      <span class="text-gray-700">
                        <svelte:component this={child.icon} />
                      </span>
                      <h3 class="text-lg font-medium text-gray-900">{child.title}</h3>
                    </div>
                  {:else}
                    <h3 class="text-lg font-medium text-gray-900 mb-3">{child.title}</h3>
                  {/if}
                  <div class="text-gray-600">
                    {@html child.content}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Custom Content -->
        {#if starter.customContent}
          <div class="space-y-4">
            {#each starter.customContent as content}
              <div class="p-6 rounded-lg border border-gray-200 bg-white">
                <h3 class="text-lg font-medium text-gray-900 mb-2">{content.title}</h3>
                <p class="text-gray-600">{content.description}</p>
                {#if content.links}
                  <div class="mt-4 flex gap-4">
                    {#each content.links as link}
                      <a 
                        href={link.url} 
                        class="text-gray-900 hover:text-gray-700 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.text} →
                      </a>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Sidebar - After main content on mobile -->
      <div class="w-full lg:w-80 lg:flex-shrink-0">
        <div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <!-- Title - Only visible on desktop -->
          <h1 class="hidden lg:block text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            {starter.title}
          </h1>

          <div class="space-y-6">
            <!-- Technologies -->
            <div class="space-y-2">
              <h2 class="font-semibold text-gray-700">Tech Stack</h2>
              <div class="flex flex-wrap gap-2">
                {#each starter.framework as tech}
                  <span class="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>

            <!-- Category -->
            <div class="space-y-2">
              <h2 class="font-semibold text-gray-700">Category</h2>
              <span class="px-3 py-1 rounded-md text-sm bg-blue-100 text-blue-800 capitalize">
                {starter.category}
              </span>
            </div>

            <!-- Price -->
            <div class="space-y-2">
              <h2 class="font-semibold text-gray-700">Price</h2>
              <span class="px-3 py-1 rounded-md text-sm inline-block {starter.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
                {#if starter.priceAmount}
                  {starter.priceAmount}
                {:else}
                  {starter.price}
                {/if}
              </span>
            </div>

            <!-- Links -->
            <div class="grid grid-cols-2 gap-2">
              {#if starter.demoUrl}
                <a
                  href={starter.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
                >
                  Preview
                </a>
              {/if}

              {#if starter.sourceCodeUrl}
                <a
                  href={starter.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
                >
                  Source Code
                </a>
              {/if}

              {#if starter.visitUrl}
                <a
                  href={starter.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="col-span-2 inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
                >
                  Visit
                </a>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Starter not found</p>
  </div>
{/if} 