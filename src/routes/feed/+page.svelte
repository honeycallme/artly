<script lang="ts">
   import Gallery from "$lib/components/sections/gallery.svelte";

   export let data;
   let loading = true;

   setTimeout(() => {
      loading = data.options.loading;
   }, 1000);


</script>

<div>

   {#if loading}
      <div class="w-full h-[100dvh] center">
         <span class="w-24 loading loading-spinner"></span>
      </div>
   {/if}

   <Gallery {data} bind:loading={loading} />
</div>
