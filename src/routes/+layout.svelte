<script lang="ts">
	import { onMount } from 'svelte';
   import Navigation from "./../lib/components/special/navigation.svelte";
   import { Toaster } from 'svelte-french-toast';
   import lenis from '$lib/utils/lenis'
   import { blur } from 'svelte/transition';
   import "../app.css";

   onMount(() => {
      lenis;
   });

   export let data: any;
</script>

<Toaster />
<div
   class="grid bg-white grid-rows-13 screen"
   data-theme="retro"
   class:main={!data.user}
>
   <div class="row-span-1 mb-8">
      <Navigation user={data.user} providers={data.providers} />
   </div>

   {#key data.url}
      <div class="row-span-9" transition:blur={{ duration: 800, amount : 10 }}>
         <slot />
      </div>
   {/key}
</div>

<style>
   .main {
      background-color: #ff99fc;
      background-image: radial-gradient(
            at 92% 85%,
            hsla(340, 86%, 69%, 1) 0px,
            transparent 50%
         ),
         radial-gradient(at 77% 63%, hsla(26, 82%, 60%, 1) 0px, transparent 50%),
         radial-gradient(
            at 57% 62%,
            hsla(317, 75%, 75%, 1) 0px,
            transparent 50%
         ),
         radial-gradient(at 69% 7%, hsla(348, 71%, 72%, 1) 0px, transparent 50%),
         radial-gradient(
            at 73% 60%,
            hsla(277, 93%, 69%, 1) 0px,
            transparent 50%
         ),
         radial-gradient(
            at 40% 24%,
            hsla(356, 67%, 74%, 1) 0px,
            transparent 50%
         ),
         radial-gradient(at 51% 87%, hsla(5, 82%, 61%, 1) 0px, transparent 50%);
   }
</style>
