<script lang="ts">
  export let image: string;
  export let href: string;
  export let title: string = "Advertisement";
</script>

<a href={href} target="_blank" rel="noopener" class="group block bg-white rounded-2xl border border-gray-200 transition-colors overflow-hidden">
  <div class="relative w-full h-[auto] bg-emerald-50 text-emerald-950">
    <div class="relative left-4 py-1 flex gap-2 z-10 ">
        <span class="inline-flex items-center sm:px-2.5 py-0.5  text-xs font-semibold sm">
          Promoted
        </span>
      </div>
    <img 
      src={image} 
      draggable="false"
      alt={title}
      class="w-auto h-full transition-transform duration-500" 
    />
  </div>
</a> 
