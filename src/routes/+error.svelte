<script lang="ts">
   import { goto } from "$app/navigation";
   import { page } from "$app/stores";
   import Hero from "$lib/components/sections/hero.svelte";

   const title = $page.status;
   const description = $page.error?.message;

   function goHome() {
      goto("/");
   }
</script>

<div class="w-full h-full main">
   <Hero {title} {description}>
      <button class="btn btn-error btn-wide mr-[10dvw]" on:click={goHome}>Go Home</button>
   </Hero>
</div>

<style>
   .main {
      overflow: hidden;
   }
</style>
