<script lang="ts">
   import { page } from "$app/stores";
   import Hero from "$lib/components/sections/hero.svelte";

   const title = $page.status;
   const description = $page.error?.message;
</script>

<div class="w-full h-full main">
   <Hero {title} {description} />
</div>

<style>
   .main {
      overflow: hidden;
   }
</style>
