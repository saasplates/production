<script lang="ts">
  export let data;
  const { boilerplate } = data;
  import { scrollPosition } from '$lib/stores/scroll';
  import { fade } from 'svelte/transition';
  
  let imageLoaded = false;

  function handleBackClick() {
    history.back();
  }

  function onImageLoad() {
    imageLoaded = true;
  }
</script>

{#if boilerplate}
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex gap-8">
      <!-- Sidebar -->
      <div class="w-80 flex-shrink-0 border-r border-gray-300">
        <div class="top-8 space-y-6 bg-white p-4 pr-6 rounded-lg">
          <!-- Back to Homepage -->
          <a 
            href="#"
            on:click|preventDefault={handleBackClick}
            class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-2"
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

          <h1 class="text-2xl font-bold text-gray-900">
            {boilerplate.title}
          </h1>

          <!-- Technologies -->
          <div class="space-y-2">
            <h2 class="font-semibold text-gray-700">Framework</h2>
            <div class="flex flex-wrap gap-2">
              {#each boilerplate.framework as tech}
                <span class="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
                  {tech}
                </span>
              {/each}
            </div>
          </div>

          <!-- Price -->
          <div class="space-y-2">
            <h2 class="font-semibold text-gray-700">Price</h2>
            <span class="px-3 py-1 rounded-md text-sm inline-block {boilerplate.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
              {boilerplate.price}
            </span>
          </div>

          <!-- Demo Button -->
          <a
            href={boilerplate.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800"
          >
            View Demo
          </a>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 space-y-8">
        <div class="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {#if !imageLoaded}
            <div class="absolute inset-0 animate-pulse bg-gray-200" />
          {/if}
          <img
            src={boilerplate.mainImage}
            alt={boilerplate.title}
            draggable="false"
            on:load={onImageLoad}
            class="w-full h-full object-cover rounded-lg border border-slate-200 transition-opacity duration-300"
            class:opacity-0={!imageLoaded}
            class:opacity-100={imageLoaded}
          />
        </div>

        <!-- Description -->
        <div class="prose max-w-none">
          <h2 class="text-xl font-semibold mb-4">Description</h2>
          <p class="text-gray-600">
            {boilerplate.description}
          </p>
        </div>

        <!-- Children Section - Only if children exist -->
        {#if boilerplate.children}
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Additional Information</h2>
            <div class="grid grid-cols-1 gap-4">
              {#each boilerplate.children as child}
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

        <!-- Features Section - Only if features exist -->
        {#if boilerplate.features}
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each boilerplate.features as feature}
                <div class="p-4 rounded-lg border border-gray-200 bg-white">
                  <h3 class="font-medium text-gray-900">{feature.title}</h3>
                  <p class="text-sm text-gray-600">{feature.description}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Custom Content Cards - Only if customContent exists -->
        {#if boilerplate.customContent}
          <div class="space-y-4">
            {#each boilerplate.customContent as content}
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
    </div>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Boilerplate not found</p>
  </div>
{/if}