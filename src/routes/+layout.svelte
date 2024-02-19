<script lang="ts">
   import { onMount } from "svelte";
   import Navigation from "./../lib/components/special/navigation.svelte";
   import { Toaster } from "svelte-french-toast";
   import { blur } from "svelte/transition";
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

   export let data: any;
</script>

<Toaster />
<div
   class="grid bg-white bg-cover grid-rows-13 screen"
   data-theme="retro"
   class:main={!data.user}
>
   <div class="row-span-1 mb-8">
      <Navigation user={data.user} providers={data.providers} />
   </div>

   {#key data.url}
      <div class="row-span-9" transition:blur={{ duration: 500, amount: 10 }}>
         <slot />
      </div>
   {/key}
</div>

<style>
   .main {
      background-image: url('/images/home.jpg');
   }
</style>
