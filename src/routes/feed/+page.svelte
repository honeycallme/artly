<script lang="ts">
   import Gallery from "$lib/components/sections/gallery.svelte";

   let loading = true;
   let collection = 'posts';
   let settings = { sort: '@random' };

   export let data;
</script>

<div>

   {#if loading}
      <div class="w-full h-[80vh] center">
         <span class="w-24 loading loading-spinner"></span>
      </div>
   {/if}

   <Gallery {settings} {collection} limit={4} bind:loading={loading} />
</div>
