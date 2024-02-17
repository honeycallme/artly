<script lang="ts">
   import Gallery from "$lib/components/sections/gallery.svelte";

   export let data;

   let loading = true;
   let collection = "likes";
   let settings = {
      sort: "-created",
      expand: 'post',
      filter: `user.id = '${data.user.id}'`,
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
