<script lang="ts">
   import { Modal } from "flowbite-svelte";
   import { scale } from "svelte/transition";

   export let data: any;

   function test(element: any) {
      console.log("clicked on: ", element);
   }

   let postModal = false;
</script>

<div class="w-full h-full hover:opacity-90" transition:scale={{duration : 500}}>
   <!-- svelte-ignore a11y-no-static-element-interactions -->
   <!-- svelte-ignore a11y-click-events-have-key-events -->
   <div on:click={() => (postModal = true)} class="w-full h-full">
      <div class="container">
         <img src={data.content} alt={data.id} class="image" />
      </div>
   </div>
</div>

<Modal title={data.id} bind:open={postModal} autoclose={false} outsideclose size={'lg'} >
   <div class="flex">
      <div class="container">
         <img src={data.content} alt={data.id} class="image" />
      </div>

      <p
         class="pt-8 text-base leading-relaxed text-center text-gray-500 dark:text-gray-400"
      >
         Please contact support if a problem arises.
      </p>
   </div>
</Modal>

<style>
   .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
   }

   .image {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 10%;
   }
</style>
