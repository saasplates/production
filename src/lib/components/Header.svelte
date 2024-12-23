<script>
  import { goto } from '$app/navigation';
</script>

<header>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        <a href="/" class="text-xl font-bold text-gray-900">
          SaasPlates
        </a>
      </div>

      <!-- Navigation -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-4">
          <a 
            href="/blog" 
            class="inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
            >
          Blog
        </a>
        <a 
          href="/advertise" 
          class="inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
        >
          Advertise
          </a>
        </div>
        <a 
          href="/submit" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
      >
        Submit Boilerplate
      </a>
      </div>
    </div>
  </div>
</header> 