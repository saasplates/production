<script lang="ts">
  export let data;
  const { boilerplate } = data;
</script>

{#if boilerplate}
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {boilerplate.title}
      </h1>
      
      <p class="text-lg text-gray-600 mb-8">
        {boilerplate.description}
      </p>

      <!-- Only render if framework exists and is an array -->
      {#if boilerplate.framework && Array.isArray(boilerplate.framework)}
        <div class="flex items-center gap-4 mb-8">
          {#each boilerplate.framework as tech}
            <span class="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
              {tech}
            </span>
          {/each}
          <span class="px-3 py-1 rounded-full text-sm {boilerplate.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
            {boilerplate.price}
          </span>
        </div>
      {/if}

      <img 
        src={boilerplate.image} 
        alt={boilerplate.title}
        class="w-full rounded-lg shadow-lg mb-8"
      />

      <div class="flex justify-center">
        <a
          href={boilerplate.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800"
        >
          View Demo
        </a>
      </div>
    </div>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Boilerplate not found</p>
  </div>
{/if} 