<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { authorsStore } from '$lib/stores/authors';
  import { blogStore, authorPostCounts } from '$lib/stores/blog';

  export let data;
  const { post } = data;
  const author = $authorsStore.find(a => a.id === post?.authorId);
  $: postCount = $authorPostCounts.get(author?.id || '') || 0;
</script>

<svelte:head>
  {#if post}
    <title>{post.title} | SaaS Boilerplates Hub Blog</title>
    <meta name="description" content={post.description} />
    <meta name="author" content={author?.name || ''} />
    <link rel="canonical" href="https://saasboilerplates.dev/blog/{post.slug}" />
  {/if}
</svelte:head>

{#if post}
  <main class="min-h-screen bg-gray-50 py-12">
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-12">
        <div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
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
                draggable="false"
                alt={author.name}
                class="w-6 h-6 rounded-full mr-2"
              />
              <a class="text-gray-500" href={`/authors/${author.id}`}>{author.name}</a>
            </div>
          {/if}
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p class="text-xl text-gray-600">{post.description}</p>
        {#if post.tags?.length}
          <div class="mt-4 flex flex-wrap gap-2 justify-center">
            {#each post.tags as tag}
              <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {tag}
              </span>
            {/each}
          </div>
        {/if}
      </header>

      <div class="prose prose-gray max-w-none bg-white rounded-lg border border-gray-200 p-8">
        <svelte:component this={post.content} />
      </div>

      {#if author}
        <div class="mt-12 bg-white border border-gray-200 rounded-lg p-8">
          <a 
            href={`/authors/${author.id}`} 
            class="block"
          >
            <div class="md:flex md:items-center md:justify-between">
              <div class="flex items-center">
                <img 
                  src={author.avatar}
                  draggable="false"
                  alt={author.name}
                  class="w-24 h-24 rounded-full object-cover"
                />
                <div class="ml-6">
                  <h3 class="text-2xl font-bold text-gray-900 group-hover:text-gray-700">{author.name}</h3>
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
          </a>
        </div>
      {/if}
    </article>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Post not found</p>
  </div>
{/if} 