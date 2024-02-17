<script lang="ts">
   import Gallery from "$lib/components/sections/gallery.svelte";

   export let data;

   let loading = true;
   let collection = "saves";
   let settings = {
      sort: "-created",
      filter: `user.id = '${data.user.id}'`,
      expand: 'post'
   };

</script>

<div>
   {#if loading}
      <div class="w-full h-[80vh] center">
         <span class="w-24 loading loading-spinner"></span>
      </div>
   {/if}

   <Gallery {settings} {collection} limit={3} bind:loading />
</div>
