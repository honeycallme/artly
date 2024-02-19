<script lang="ts">
   import { goto } from "$app/navigation";
   import { scale } from "svelte/transition";

   export let data: any;
   let clicked = false;

   function detail() {
      clicked = true;

      setTimeout(() => {
         goto(`/post/${data.id}`);
      }, 50);

   }
</script>

<div
   class="w-full h-full hover:opacity-90 drop-shadow-2xl"
   transition:scale={{ duration: 500 }}
>
   <!-- svelte-ignore a11y-no-static-element-interactions -->
   <!-- svelte-ignore a11y-click-events-have-key-events -->
   <div on:click={detail} class="w-full h-full">

      <div class="container">
         <img src={data.content} alt={data.id} class="image" />
      
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
