<script lang="ts">
   import { onMount } from "svelte";
   import Sidebar from "$lib/components/special/sidebar.svelte";
   import { Toaster } from "svelte-french-toast";
   import { slide, fade } from "svelte/transition";
   import { initScroll, lenis } from "$lib/stores/lenis";
   import "../app.css";

   // smooth scrolling

   onMount(() => {
      $lenis = initScroll();
   });
   
   $: {
      console.log(data.url);

      if ($lenis) {
         $lenis.scrollTo(0, { duration: 0 });
      }
   }

   let size = 64;
   export let data: any;
</script>

<Toaster />

<div class="">
   <Sidebar bind:width={size} user={data.user} />
</div>

<div
   class="grid grid-cols-10 bg-white bg-cover screen"
   data-theme="retro"
   class:main={!data.user}
>
   {#key data.url}
         <div
            class="overflow-hidden {(size == 64 && data.user) ? 'col-span-9' : 'col-span-10'}"
            transition:slide={{ duration: 800 }}
         >
            <slot />
         </div>
   {/key}
</div>

<style>
   .main {
      background-image: url("/images/home.jpg");
   }
</style>
