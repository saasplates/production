<script>
  import { goto } from '$app/navigation';
</script>

<div class="fixed bottom-6 right-6 z-50">
  <button
    on:click={() => goto('/submit')}
    class="inline-flex items-center px-6 py-3 text-base font-medium border border-slate-200 rounded-full text-gray-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
    </svg>
    Submit Boilerplate
  </button>
</div> 