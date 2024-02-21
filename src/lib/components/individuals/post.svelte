<script lang="ts">
   import { goto } from "$app/navigation";
   import { scale } from "svelte/transition";
   import Icon from "@iconify/svelte";

   export let data: any;
   export let options: any;
   let clicked = false;

   function detail() {
      if (!options.actions) return;

      clicked = true;

      setTimeout(() => {
         goto(`/post/${data.id}`);
      }, 50);
   }

   let icons : any = {
      "audio": "bi:music-player-fill",
      "video" : "ph:video-fill",
      "pdf": "bxs:book",
   }
</script>

<div
   class="w-full h-full hover:opacity-90 drop-shadow-2xl"
   transition:scale={{ duration: 500 }}
>
   <!-- svelte-ignore a11y-no-static-element-interactions -->
   <!-- svelte-ignore a11y-click-events-have-key-events -->
   <div on:click={detail} class="w-full h-full">
      <div class="container relative">
         {#if data.type == "image"}
            <img src={data.content} alt={data.id} class="image" />
         {:else}
            <img
               src="/images/placeholders/{data.type}.jpeg"
               alt={data.id}
               class="image"
            />

            <div class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 center">
               <span class="font-bold text-center text-9xl">
                  <Icon icon="{icons[data.type]}" />
               </span>
               <span class="text-4xl italic font-bold text-center">
                  {data.name}
               </span>
            </div>
         {/if}

         {#if clicked}
            <div class="overlay"></div>
            <div class="spinner-container">
               <span class="w-16 text-white loading loading-dots"></span>
            </div>
         {/if}
      </div>
   </div>
</div>

<style>
   .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
   }

   .image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 10%;
   }

   .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10%;
   }

   .spinner-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
   }
</style>
