<script lang="ts">
  import { page } from '$app/stores';
  import { marked } from 'marked';
  import { blogPosts } from '$lib/stores/blog';

  const post = blogPosts.find(p => p.slug === $page.params.slug);
  const htmlContent = post ? marked(post.content) : '';

  // Generate meta description from content
  $: metaDescription = post?.content
    ? post.content.substring(0, 160).replace(/[#*`]/g, '').trim() + '...'
    : '';
</script>

<svelte:head>
  {#if post}
    <title>{post.title} | SaaS Templates Hub Blog</title>
    <meta name="description" content={metaDescription} />
    <meta name="author" content={post.author} />
    <link rel="canonical" href="https://saastemplates.dev/blog/{post.slug}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={metaDescription} />
    <meta property="article:published_time" content={post.date} />
    <meta property="article:author" content={post.author} />
  {/if}
</svelte:head>

<Header />

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
          <span class="text-gray-300">•</span>
          <span>By {post.author}</span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p class="text-xl text-gray-600">{post.description}</p>
      </header>

      <div class="prose prose-gray max-w-none bg-white rounded-lg border border-gray-200 p-8">
        {@html htmlContent}
      </div>
    </article>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Post not found</p>
  </div>
{/if} 