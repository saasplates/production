<script lang="ts">
  import { onMount } from 'svelte';
  import { authors } from '$lib/stores/authors';
  
  export let data;
  const posts = data?.posts || [];

  function getAuthor(authorId: string) {
    return authors.find(a => a.id === authorId) || null;
  }
</script>

<main class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
        Blog
      </h1>
      <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
        Insights and guides about web development, design, and SaaS
      </p>
    </div>

    <div class="mt-12 space-y-8">
      {#if posts.length > 0}
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
            </a>
          </article>
        {/each}
      {:else}
        <div class="text-center py-12">
          <p class="text-gray-500">No blog posts found.</p>
        </div>
      {/if}
    </div>
  </div>
</main> 