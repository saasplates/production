<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<div class="w-full bg-[#F5F5F5] transition-colors cursor-pointer" on:click={() => goto('/discord')}>
  <div class="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-center gap-2">
      <span class="text-sm sm:text-base text-gray-900">
        ✨ Join our Discord server to interact with the community
      </span>
    </div>
  </div>
</div> 