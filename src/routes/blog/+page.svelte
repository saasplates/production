<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { blogPosts } from '$lib/stores/blog';

  // Calculate reading time
  function getReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }
</script>

<svelte:head>
  <title>Blog | SaaS Templates Hub - Web Development Insights</title>
  <meta name="description" content="Read the latest articles about web development, SaaS templates, and best practices for building modern web applications." />
  <link rel="canonical" href="https://saastemplates.dev/blog" />
</svelte:head>

<Header />

<main class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900">Blog</h1>
      <p class="mt-3 text-lg text-gray-500">
        Insights and guides about SaaS templates and development
      </p>
    </div>

    <div class="mt-12 space-y-8">
      {#each blogPosts as post}
        <article class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
          <a href={`/blog/${post.slug}`} class="block p-6">
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <time datetime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</time>
              <span class="text-gray-300">•</span>
              <span>{getReadingTime(post.content)}</span>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p class="text-gray-600">{post.description}</p>
            <div class="mt-4 flex items-center gap-2">
              <span class="text-sm text-gray-500">By {post.author}</span>
              <span class="text-gray-300">•</span>
              <span class="text-sm font-medium text-gray-900">Read more →</span>
            </div>
          </a>
        </article>
      {/each}
    </div>
  </div>
</main> 