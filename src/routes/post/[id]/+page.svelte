<script lang="ts">
   import type { PageData } from "./$types";
   import Gallery from "$lib/components/sections/gallery.svelte";

   export let data: PageData;

   // let loading = true;
   // let collection = "posts";
   // let settings = {
   //    sort: "-created",
   //    filter: `creator.id = '${data.profile.id}'`,
   // };
</script>

<main class="w-full h-full">
<!-- 
   {#if loading}
      <div class="w-full h-full center">
         <span class="w-24 loading loading-spinner"></span>
      </div>
   {/if}

   <Gallery {settings} {collection} limit={3} bind:loading /> -->
</main>
