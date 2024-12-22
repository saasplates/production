<script>
  import { goto } from '$app/navigation';
</script>

<a 
  href="/submit"
  class="group block"
>
  <div class="flex flex-col rounded-lg border-[1px] border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors">
    <div class="flex-shrink-0 relative h-48 bg-gray-100 flex items-center justify-center">
      <div class="rounded-full bg-gray-200 p-4">
        <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    </div>
    <div class="flex-1 p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 uppercase tracking-wider">
          Submit Template
        </p>
        <div class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            Share Your Work
          </p>
          <p class="mt-3 text-base text-gray-500">
            Join thousands of developers and showcase your templates to the community
          </p>
        </div>
      </div>
      <div class="mt-6">
        <span
          class="pointer-events-none inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 group-hover:bg-gray-800 transition-colors"
        >
          Submit Now
        </span>
      </div>
    </div>
  </div>
</a> 