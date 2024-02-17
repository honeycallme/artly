<script lang="ts">
   import { enhance } from "$app/forms";
   import { Modal } from "flowbite-svelte";
   import Icon from "@iconify/svelte";

   export let user: any;
   export let providers: any;

   let loading: boolean = false;
   let loginModal = false;
</script>

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
            <button class="btn" on:click={() => (loginModal = true)}>
               login / register
            </button>
         </div>
      {:else}
         <div class="flex-none gap-4">
            <div class="mr-2 form-control">
               <input
                  type="text"
                  placeholder="Search"
                  class="bg-transparent input input-bordered w-80"
               />
            </div>

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


<Modal
   title="Log In / Sign Up"
   bind:open={loginModal}
   autoclose={false}
   outsideclose
   classBackdrop="bg-red-400"
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
            class="w-3/4 text-2xl text-center btn"
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
