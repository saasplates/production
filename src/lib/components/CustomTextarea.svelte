<script lang="ts">
  import { Textarea } from 'flowbite-svelte';
  
  export let size: '1' | '2' | '3' = '1';
  export let placeholder: string = '';
  export let id: string;
  export let name: string;
  export let rows: number = 6;

  let sizeClasses = {
    '1': 'text-sm',
    '2': 'text-base',
    '3': 'text-lg'
  };
</script>

<Textarea
  {id}
  {name}
  {rows}
  {placeholder}
  class="block w-full {sizeClasses[size]}"
/>

<style>
  :global(.flowbite-textarea) {
    min-height: 120px;
    max-height: 400px;
    resize: vertical;
    background-color: white !important;
    border-color: #D1D5DB !important;
  }

  :global(.flowbite-textarea:focus) {
    border-color: #6B7280 !important;
    box-shadow: 0 0 0 1px #6B7280 !important;
  }
</style> 