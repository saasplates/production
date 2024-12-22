<script lang="ts">
  import { page } from '$app/stores';
  import { authorsStore } from '$lib/stores/authors';
  import { blogStore, authorPostCounts } from '$lib/stores/blog';

  const author = $authorsStore.find(a => a.id === $page.params.id);
  $: authorPosts = $blogStore.filter(post => post.authorId === author?.id);
  $: postCount = $authorPostCounts.get(author?.id || '') || 0;
</script>

{#if author}
  <main class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Author Header -->
      <div class="bg-white border border-gray-200 rounded-lg p-8 mb-12">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex items-center">
            <img 
              src={author.avatar} 
              draggable="false"
              alt={author.name}
              class="w-24 h-24 rounded-full object-cover"
            />
            <div class="ml-6">
              <h1 class="text-2xl font-bold text-gray-900">{author.name}</h1>
              <p class="text-lg text-gray-500">{author.role}</p>
              {#if author.location}
                <p class="mt-1 text-sm text-gray-500">
                  <span class="inline-block align-middle">📍</span> {author.location}
                </p>
              {/if}
            </div>
          </div>
          
          <div class="mt-6 flex flex-wrap gap-4 md:mt-0">
            {#if author.twitter}
              <a 
                href={`https://twitter.com/intent/follow?screen_name=${author.twitter.replace('@', '')}`}
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                target="_blank"
                rel="noopener"
              >
                Follow on X
              </a>
            {/if}
            {#if author.website}
              <a 
                href={author.website}
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                target="_blank"
                rel="noopener"
              >
                Visit Website
              </a>
            {/if}
          </div>
        </div>

        <p class="mt-6 text-gray-600">{author.bio}</p>

        <div class="mt-6 flex items-center gap-4 text-sm text-gray-500">
          <span>{postCount} posts</span>
          <span>•</span>
          <span>
            Joined {new Date(author.stats.joinedDate).toLocaleDateString('en-US', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>

      <!-- Author's Posts -->
      <div class="space-y-8">
        <h2 class="text-xl font-bold text-gray-900">Posts by {author.name}</h2>
        {#if authorPosts.length > 0}
          {#each authorPosts as post}
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
                  {#if post.publishedAt}
                    <span>•</span>
                    <span>Published {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  {/if}
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p class="text-gray-600">{post.description}</p>
                {#if post.tags?.length}
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
          <p class="text-gray-500">No posts yet.</p>
        {/if}
      </div>
    </div>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Author not found</p>
  </div>
{/if} 