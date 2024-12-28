<script>
  import { goto } from '$app/navigation';
  import ShareButton from './ShareButton.svelte';
</script>

<header class="fixed top-0 z-50 border-b border-gray-200 left-0 right-0 w-full bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        <a href="/" class="flex items-center gap-2">
          <svg class="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 244 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 305.093L156.289 296.286C224.831 276.902 106.583 179.953 64.9537 121.157C50.3496 100.53 131.71 44.5714 228.733 39.9288" stroke="currentColor" stroke-width="60"/>
          </svg>
        </a>
      </div>

      <!-- Navigation -->
      <div class="flex items-center gap-2 sm:gap-6">
        <div class="flex items-center gap-4">
          <ShareButton compact={true} />
          <a 
          href="/blog" 
          class="inline-flex items-center px-3 sm:px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
        >
          Blog
        </a>
          <a 
            href="/advertise" 
            class="inline-flex items-center px-3 sm:px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
          >
            Advertise
          </a>
        </div>
        <a 
          href="/submit" 
          class="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        >
          <span class="hidden sm:inline">Submit Boilerplate</span>
          <span class="sm:hidden">Submit</span>
        </a>
      </div>
    </div>
  </div>
</header> 