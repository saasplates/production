<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<a 
  href="https://0auth.example"
  class="flex flex-col rounded-lg border-[1px] border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors"
>
  <div class="flex-shrink-0 relative h-48 overflow-hidden bg-gradient-to-br from-indigo-50 to-indigo-100">
    <div class="absolute top-4 left-4 flex gap-2 z-10">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 shadow-sm">
        Advertisement
      </span>
    </div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="rounded-full bg-white p-4 shadow-md mb-4 mx-auto w-16">
          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <span class="text-2xl font-bold text-gray-900">0auth</span>
      </div>
    </div>
  </div>
  <div class="flex-1 p-6 flex flex-col justify-between">
    <div class="flex-1">
      <div class="block">
        <p class="text-xl font-semibold text-gray-900">
          Complete Auth Solution
        </p>
        <p class="mt-3 text-base text-gray-500">
          Add authentication to your app in minutes with our secure, scalable solution
        </p>
      </div>
    </div>
  </div>
</a> 