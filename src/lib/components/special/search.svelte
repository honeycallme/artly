<script lang="ts">
   import { MultiSelect } from "flowbite-svelte";
   import { tags, selected } from "$lib/stores/tags";

   export let search: boolean = false;
</script>

{#if search}
   <div class="overlay">
      <div class="relative flex items-center justify-start w-full search">
         <kbd class="absolute ml-4 text-white kbd kbd-md bg-neutral" style="z-index: 9999;">Esc</kbd>
         <div class="w-1/3 form-control">
            <MultiSelect
               items={$tags}
               bind:value={$selected}
               name="tags"
               class="p-6 pl-20 bg-white"
            />
         </div>
      </div>
   </div>
{/if}

<style>
   .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
   }

   .search {
      position: fixed;
      z-index: 8888;
      top: 40%;
      left: calc(40% - 8rem);
   }
</style>
