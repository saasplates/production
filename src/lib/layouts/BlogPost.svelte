<script lang="ts">
  import { authors } from '$lib/stores/authors';

  /** @type {any} */
  export let metadata = {
    title: '',
    description: '',
    date: '',
    author: '',
    tags: []
  };

  $: author = metadata?.author ? authors.find(a => a.id === metadata.author) : null;
</script>

<main class="min-h-screen bg-gray-50 py-8 sm:py-12">
  <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <header class="text-center mb-8 sm:mb-12">
      <div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
        <time datetime={metadata.date}>
          {new Date(metadata.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
        {#if author}
          <span class="text-gray-300">•</span>
          <div class="flex items-center">
            <img 
              src={author.avatar} 
              draggable="false"
              alt={author.name}
              loading="lazy"
              class="w-6 h-6 rounded-full mr-2"
            />
            <a class="text-gray-500" href={`/authors/${author.id}`}>{author.name}</a>
          </div>
        {/if}
      </div>
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{metadata.title}</h1>
      <p class="text-lg sm:text-xl text-gray-600">{metadata.description}</p>
      {#if metadata.tags?.length}
        <div class="mt-4 flex flex-wrap gap-2 justify-center">
          {#each metadata.tags as tag}
            <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {tag}
            </span>
          {/each}
        </div>
      {/if}
    </header>

    <div class="prose prose-gray max-w-none bg-white rounded-lg border border-gray-200 p-4 sm:p-8">
      <slot />
    </div>
  </article>
</main> 