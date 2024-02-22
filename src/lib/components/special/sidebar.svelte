<script lang="ts">
   import {
      Sidebar,
      SidebarGroup,
      SidebarItem,
      SidebarWrapper,
      SidebarDropdownItem,
      SidebarDropdownWrapper,
   } from "flowbite-svelte";

   import Icon from "@iconify/svelte";
   import { page } from "$app/stores";
   import { goto } from "$app/navigation";
   import Search from "./search.svelte";
   import { onMount } from "svelte";
   
   export let width: any;
   export let user: any;

   let size: number;
   let active = true;
   let paths: string[];
   let search: boolean = false;

   $: {
      paths = $page.url.pathname.split("/").filter((part) => !!part);
      if (paths[0] == "post") paths = paths.slice(0, 1);
   }

   // helper functions

   function capitalizeFirstLetter(word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
   }

   async function logOut() {
      await fetch("/api/auth");
      goto("/");
   }

   // code to handler keypresses for search bar

   let keysDown = {
      meta: false,
      k: false,
      escape: false,
   };


   function handleKeypress(event: KeyboardEvent) {
      if (size < 768 || ((paths.length > 0 && paths[0] != "feed") && paths[0][0] != "@"))
         return;

      if (event.repeat) return;

      switch (event.key) {
         case "Meta":
         case "Control":   
            keysDown.meta = !keysDown.meta;
            event.preventDefault();
            break;

         case "k":
            keysDown.k = !keysDown.k;
            event.preventDefault();
            break;

         case "Escape":
            keysDown.escape = !keysDown.escape;
            event.preventDefault();
            break;
      }

      if (keysDown.meta && keysDown.k && !search) {
         search = true;
      }

      if (search && keysDown.escape) {
         search = false;
         keysDown.meta = false;
         keysDown.k = false;
      }
   }

   // code to handle side bar toggling
   
   $: if (!user || !active) {
      width = "full";
   }

   $: size < 768 ? (width = "full") : (width = 64);
   $: activeUrl = $page.url.pathname;

   onMount(() => {
      if (size < 768)
         active = false;
   });

   $: console.log(width);
</script>

<svelte:window
   bind:innerWidth={size}
   on:keydown={handleKeypress}
   on:keyup={handleKeypress}
/>

{#if user && active}
   <Sidebar class="fixed right-0 z-50 w-{width}" {activeUrl}>
      {#if size < 768}
         <div class="fixed right-0 z-50">
            <button
               class="m-4 btn btn-circle btn-md btn-secondary"
               on:click={() => {
                  active = !active;
               }}>+</button
            >
         </div>
      {/if}

      <SidebarWrapper
         class="h-[100vh] flex md:glass md:bg-transparent bg-white w-full flex-col justify-center p-6"
      >
         <SidebarGroup>
            <SidebarItem label="Feed" href="/feed">
               <svelte:fragment slot="icon">
                  <Icon icon="fa-solid:home" class="text-lg" />
               </svelte:fragment>
            </SidebarItem>

            <SidebarItem label="Categories" href="/categories/image">
               <svelte:fragment slot="icon">
                  <Icon icon="carbon:categories" class="text-lg" />
               </svelte:fragment>
            </SidebarItem>

            <SidebarItem label="Upload" href="/upload">
               <svelte:fragment slot="icon">
                  <Icon icon="material-symbols:upload" class="text-xl" />
               </svelte:fragment>
            </SidebarItem>

            <SidebarItem label="Likes" href="/likes">
               <svelte:fragment slot="icon">
                  <Icon icon="ph:heart-fill" class="text-xl text-primary" />
               </svelte:fragment>
            </SidebarItem>

            <SidebarItem label="Saves" href="/saves">
               <svelte:fragment slot="icon">
                  <Icon icon="prime:bookmark-fill" class="text-xl" />
               </svelte:fragment>
            </SidebarItem>

            <SidebarDropdownWrapper
               label="@{user.username}"
            >
               <svelte:fragment slot="icon">
                  <div class="flex-1 -mr-[68%] avatar">
                     <div class="w-6 rounded-full">
                        <img src={user.avatar} alt={user.username} />
                     </div>
                  </div>
               </svelte:fragment>
               <SidebarDropdownItem label="Profile" href="/profile" />
               <SidebarDropdownItem label="Settings" href="/settings" />
            </SidebarDropdownWrapper>

            <SidebarItem label="Logout" on:click={logOut}>
               <svelte:fragment slot="icon">
                  <Icon icon="humbleicons:logout" class="text-xl" />
               </svelte:fragment>
            </SidebarItem>
         </SidebarGroup>
         <!-- searchbar -->

         {#if size > 768 && ((paths.length > 0 && paths[0] == "feed") || paths[0][0] == "@")}
            <div class="w-full pt-8">
               <span class="px-1 py-2">search by tags</span>
               <div class="flex items-center">
                  <input
                     type="text"
                     class="w-full bg-transparent input input-bordered"
                     placeholder="Search"
                     on:click|preventDefault={() => { search = !search; }}
                  />
                  <div class="relative">
                     <kbd
                        class="absolute text-white transform -translate-y-1/2 kbd kbd-sm top-1/2 right-10 bg-neutral"
                        >⌘</kbd
                     >
                     <kbd
                        class="absolute text-white transform -translate-y-1/2 kbd kbd-sm top-1/2 right-4 bg-neutral"
                        >K</kbd
                     >
                  </div>
               </div>
            </div>
         {/if}
      </SidebarWrapper>
   </Sidebar>
{/if}

{#if !active && user}
   <div class="fixed right-0 z-50">
      <button
         class="m-4 btn btn-circle btn-md btn-secondary"
         on:click={() => {
            active = !active;
         }}>+</button
      >
   </div>
{/if}

{#if size > 768}
   <div
      class="fixed z-50 w-full p-4 transform -translate-x-1/2 rounded-2xl bottom-1 center left-1/2"
      class:custom={user}
   >
      <div
         class="flex flex-col justify-center px-4 outline-none bg-gray-50 rounded-2xl lg:flex-row"
      >
         <div class="text-sm breadcrumbs">
            <ul>
               <li>
                  <Icon icon="fa-solid:home" />
                  <a href="/" class="ml-2">Home</a>
               </li>
               {#each paths as path, index}
                  <li><a href="/{path}">{capitalizeFirstLetter(path)}</a></li>
               {/each}
            </ul>
         </div>
      </div>
   </div>
{/if}

<Search {search} />

<style>
   .custom {
      left: calc(50% - 8rem);
   }
</style>
