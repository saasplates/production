<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { authors } from '$lib/stores/authors';
  
  /** @type {import('./$types').PageData} */
  export let data;

  $: posts = data.posts;

  function getAuthor(authorId: string) {
    return authors.find(a => a.id === authorId);
  }
</script>

<svelte:head>
  <title>Blog | SaasPlates - Web Development Insights</title>
  <meta name="description" content="Read the latest articles about web development, SaaS templates, and best practices for building modern web applications." />
</svelte:head>

<Header />

<main class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Latest Articles</h1>
      <p class="mt-3 text-lg text-gray-500">
        Insights and guides about web development and SaaS templates
      </p>
    </div>

    <div class="mt-12 space-y-8">
      {#each posts as post}
        {@const author = getAuthor(post.authorId)}
        <article class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
          <a href={`/blog/${post.slug}`} class="block p-6">
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <time datetime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', { 
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
                    alt={author.name}
                    class="w-5 h-5 rounded-full mr-2"
                  />
                  <span>{author.name}</span>
                </div>
              {/if}
              {#if post.readingTime}
                <span class="text-gray-300">•</span>
                <span>{post.readingTime}</span>
              {/if}
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p class="text-gray-600">{post.description}</p>
            {#if post.tags}
              <div class="mt-4 flex flex-wrap gap-2">
                {#each post.tags as tag}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
            <div class="mt-4 flex items-center text-sm font-medium text-gray-900">
              Read more
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </article>
      {/each}
    </div>
  </div>
</main> 