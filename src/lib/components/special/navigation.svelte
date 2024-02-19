<script lang="ts">
   import { enhance } from "$app/forms";
   import { Modal } from "flowbite-svelte";
   import Icon from "@iconify/svelte";
   import { page } from '$app/stores';

   export let user: any;
   export let providers: any;

   let loading: boolean = false;
   let loginModal = false;
   let size: number;

   let paths : string[];

   $: {
      paths = $page.url.pathname.split("/").filter(part => !!part);
      if (paths[0] == "post")
         paths = paths.slice(0, 1);
   }

   function capitalizeFirstLetter(word : string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

</script>

<svelte:window bind:innerWidth={size} />

<div class="fixed z-50 w-full p-4 rounded-2xl">
   <div
      class="flex flex-col w-full bg-cover outline-none glass navbar rounded-2xl lg:flex-row"
   >
      <div class="flex-1">
         {#if !user}
            <a class="text-xl btn btn-ghost" href="/">artly 🎨</a>
         {:else}
            <a class="text-xl btn btn-ghost" href="/feed">artly 🎨</a>
         {/if}
      </div>

      {#if !user}
         <div class="flex-none">
            <button class="btn btn-secondary" on:click={() => (loginModal = true)}>
               login / register
            </button>
         </div>
      {:else}
         <div class="flex-none gap-4">

            {#if size > 768}
               <div class="mr-2 form-control">
                  <input
                     type="text"
                     placeholder="Search"
                     class="bg-transparent input input-bordered w-80"
                  />
               </div>
            {/if}

            <div class="text-4xl">
               <a href="/upload">
                  <Icon icon="line-md:uploading-loop" class="text-gray-600" />
               </a>
            </div>

            <div class="text-4xl">
               <a href="/likes">
                  <Icon icon="gravity-ui:card-heart" class="text-error" />
               </a>
            </div>

            <div class="dropdown dropdown-end">
               <div
                  tabindex="0"
                  role="button"
                  class="mx-1 scale-125 btn btn-ghost btn-circle avatar"
               >
                  <div class="rounded-full">
                     <img alt="avatar" src={user.avatar} />
                  </div>
               </div>

               <!-- svelte-ignore a11y-missing-attribute -->
               <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
               <ul
                  tabindex="0"
                  class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-gray-50"
               >
                  <li>
                     <a class="justify-between">
                        Profile
                        <span class="badge">Complete</span>
                     </a>
                  </li>
                  <li><a href="/saves">Saves</a></li>
                  <form action="/login?/logout" method="post">
                     <li><button>Logout</button></li>
                  </form>
               </ul>
            </div>
         </div>
      {/if}
   </div>
</div>

<div class="fixed z-50 w-full p-4 transform -translate-x-1/2 rounded-2xl bottom-1 left-1/2 center">
   <div class="flex flex-col justify-center px-4 outline-none glass rounded-2xl lg:flex-row">
      <div class="text-sm breadcrumbs">
         <ul>
           <li>
               <Icon icon="fa-solid:home" />
               <a href="/" class="ml-2">Home</a>
            </li> 
            {#each paths as path, index}
               <li><a href="/{path}">{ capitalizeFirstLetter(path) }</a></li> 
            {/each}
         </ul>
       </div>
   </div>
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
      {#each providers as provider}
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
