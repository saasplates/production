<script lang="ts">
  export let image: string;
  export let href: string;
</script>

<a 
  {href}
  class="flex flex-col h-[22rem] rounded-lg border-[1px] border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-colors"
>
  <div class="relative flex-1 overflow-hidden">
    <img src={image} alt="Advertisement" class="h-full w-full object-cover" />
    <div class="absolute top-4 left-4 flex gap-2 z-10">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-800 shadow-sm">
        Advertisement
      </span>
    </div>
  </div>
</a> 