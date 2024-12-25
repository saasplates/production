<script lang="ts">
  import type { Author } from '$lib/stores/authors';
  
  export let author: Author;
</script>

<div class="bg-white border border-gray-200 rounded-lg p-6">
  <div class="flex items-center">
    <img 
      src={author.avatar}
      draggable="false"
      alt={author.name}
      loading="lazy"
      class="w-16 h-16 rounded-full object-cover"
    />
    <div class="ml-4">
      <h3 class="text-lg font-semibold text-gray-900">{author.name}</h3>
      <p class="text-sm text-gray-500">{author.role}</p>
    </div>
  </div>
  
  <p class="mt-4 text-gray-600">{author.bio}</p>
  
  <div class="mt-6 flex items-center gap-4">
    {#if author.twitter}
      <a 
        href={`https://twitter.com/${author.twitter.replace('@', '')}`}
        class="text-gray-500 hover:text-gray-600"
        target="_blank"
        rel="noopener"
      >
        <span class="sr-only">Twitter</span>
        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      </a>
    {/if}
    {#if author.website}
      <a 
        href={author.website}
        class="text-gray-500 hover:text-gray-600"
        target="_blank"
        rel="noopener"
      >
        <span class="sr-only">Website</span>
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      </a>
    {/if}
  </div>
</div> 