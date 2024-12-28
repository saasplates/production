<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { authorsStore } from '$lib/stores/authors';
  import { blogStore, authorPostCounts, type BlogPost } from '$lib/stores/blog';
  import type { SvelteComponent } from 'svelte';

  interface PageData {
    post: BlogPost;
  }

  export let data: PageData;
  const { post } = data;
  const author = $authorsStore.find(a => a.id === post?.authorId);
  $: postCount = $authorPostCounts.get(author?.id || '') || 0;
</script>

<svelte:head>
  {#if post}
    <title>{post.title} | SaasPlates Blog</title>
    <meta name="description" content={post.description} />
    <meta name="author" content={author?.name || ''} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.description} />
    <meta property="article:author" content={author?.name || ''} />
    <meta property="article:published_time" content={post.publishedAt} />
    <meta property="og:image" content={`https://saasplates.com${post.ogImage || '/default-hero-image.jpg'}`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={post.title} />
    <meta name="twitter:description" content={post.description} />
    <meta name="twitter:image" content={`https://saasplates.com${post.ogImage || '/default-hero-image.jpg'}`} />
    <link rel="canonical" href="https://saasplates.com/blog/{post.slug}" />
  {/if}
</svelte:head>

{#if post}
  <main class="min-h-screen bg-gray-50 py-12">
    <article class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                loading="lazy"
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
      
      <div class="mb-8">
        <img 
          src={post.ogImage || post.image}
          alt={post.title}
          class="w-full h-auto rounded-lg border border-gray-200"
          loading="lazy"
          draggable="false"
        />
      </div>

      <div class="prose prose-gray max-w-none bg-white rounded-lg border border-gray-100 p-8">
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
                  loading="lazy"
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
