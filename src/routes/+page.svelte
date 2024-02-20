<script lang="ts">
   import Hero from "$lib/components/sections/hero.svelte";
   import { enhance } from "$app/forms";
   import { Modal } from "flowbite-svelte";
   import Icon from "@iconify/svelte";

   const title = "Artly 🎨";
   const description = "A social media platform for artists and art enthusiasts.";

   let loading: boolean = false;
   let loginModal = false;

   export let data : any;

</script>

<div class="w-full h-full">
	<Hero {title} {description}>
      <button class="btn btn-secondary" on:click={() => (loginModal = true)}>Sign In / Sign Up</button>
   </Hero>
</div>

<Modal
   title="Log In / Sign Up"
   bind:open={loginModal}
   autoclose={false}
   outsideclose
>
   <form
      method="post"
      class="gap-3 pt-8 center"
      use:enhance={() => {
         loading = true;
      }}
   >
      {#each data?.providers as provider}
         <button
            class="w-3/4 text-2xl text-center btn-secondary btn"
            formaction="/login?/{provider.name}"
            disabled={loading}
            type="submit"
         >
            <Icon icon="logos:{provider.name}-icon" />
         </button>
      {/each}

      {#if loading}
        <div class="mt-8 -mb-4">
            <span class="text-center loading loading-spinner loading-lg"></span>
        </div>
      {/if}
   </form>

   <p
      class="pt-8 text-base leading-relaxed text-center text-gray-500 dark:text-gray-400"
   >
      Please contact support if a problem arises.
   </p>
</Modal>
