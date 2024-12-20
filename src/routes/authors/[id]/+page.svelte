<script lang="ts">
  import { page } from '$app/stores';
  import { authors } from '$lib/stores/authors';
  import { templates } from '$lib/stores/templates';
  import Header from '$lib/components/Header.svelte';
  import TemplateCard from '$lib/components/TemplateCard.svelte';
  
  const author = authors.find(a => a.id === $page.params.id);
  $: authorTemplates = templates.filter(t => t.authorId === author?.id);
</script>

<svelte:head>
  {#if author}
    <title>{author.name} | SaasPlates Author Profile</title>
    <meta name="description" content={author.bio} />
  {/if}
</svelte:head>

<Header />

{#if author}
  <main class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Author Header -->
      <div class="bg-white border border-gray-200 rounded-lg p-8 mb-12">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex items-center">
            <img 
              src={author.avatar} 
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
                href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                target="_blank"
                rel="noopener"
              >
                Follow on Twitter
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

        <div class="mt-8">
          <p class="text-lg text-gray-600">{author.bio}</p>
        </div>

        {#if author.stats}
          <div class="mt-8 grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
            <div>
              <p class="text-3xl font-semibold text-gray-900">{author.stats.totalTemplates}</p>
              <p class="mt-1 text-base text-gray-500">Templates</p>
            </div>
            <div>
              <p class="text-3xl font-semibold text-gray-900">{author.stats.totalDownloads}</p>
              <p class="mt-1 text-base text-gray-500">Downloads</p>
            </div>
            <div>
              <p class="text-3xl font-semibold text-gray-900">{author.stats.rating}</p>
              <p class="mt-1 text-base text-gray-500">Average Rating</p>
            </div>
          </div>
        {/if}
      </div>

      <!-- Author's Templates -->
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Templates by {author.name}</h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {#each authorTemplates as template}
          <TemplateCard {template} />
        {/each}
      </div>
    </div>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Author not found</p>
  </div>
{/if} 