<script lang="ts">
   import { onMount } from "svelte";
   import Sidebar from "$lib/components/special/sidebar.svelte";
   import { Toaster } from "svelte-french-toast";
   import { slide, fade } from "svelte/transition";
   import Lenis from "@studio-freight/lenis";
   import "../app.css";

   // smooth scrolling

   onMount(() => {
      const lenis = new Lenis({ duration: 6 });

      function raf(time) {
         lenis.raf(time);
         requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
   });

   let width = 64;
   let colspan = 9;

   $: {
      if (width == 0) colspan = 10;
   }
   
   export let data: any;
</script>

<Toaster />

<div class="">
   <Sidebar bind:width={width} user={data.user} /> 
</div>

<div class="grid grid-cols-10 bg-white bg-cover screen" data-theme="retro" class:main={!data.user}>

   {#key data.url}
   <div class="col-span-{colspan} overflow-hidden" transition:slide={{ duration: 800}}>
      <slot />
   </div>
   {/key}

</div>

<style>
   .main {
      background-image: url('/images/home.jpg');
   }
</style>
