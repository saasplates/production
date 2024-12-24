<script lang="ts">
  import { Textarea } from 'flowbite-svelte';
  import '$lib/styles/textarea.css';
  
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