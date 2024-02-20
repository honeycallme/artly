<script lang="ts">
   import {
      Sidebar,
      SidebarGroup,
      SidebarItem,
      SidebarWrapper,
      SidebarDropdownItem,
      SidebarDropdownWrapper,
   } from "flowbite-svelte";
   import { MultiSelect } from "flowbite-svelte";
   import Icon from "@iconify/svelte";
   import { page } from "$app/stores";
   import { tags, selected } from "$lib/stores/tags";
   import { goto } from "$app/navigation";

   export let width: Number;
   export let user: any;

   let size: number;
   let paths: string[];

   $: {
      paths = $page.url.pathname.split("/").filter((part) => !!part);
      if (paths[0] == "post") paths = paths.slice(0, 1);
   }

   function capitalizeFirstLetter(word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1);
   }

   $: if (!user) {
      width = 0;
   }

   async function logOut() {
      await fetch("/api/auth");
      goto("/");
   }

   $: activeUrl = $page.url.pathname;
</script>

<svelte:window bind:innerWidth={size} />

{#if user}
   <Sidebar class="fixed right-0 z-50 w-{width}" {activeUrl}>
      <SidebarWrapper
         class="h-[100vh] flex glass bg-transparent w-full flex-col justify-center"
      >
         <SidebarGroup>
            <SidebarItem label="Feed" href="/feed">
               <svelte:fragment slot="icon">
                  <Icon icon="fa-solid:home" class="text-lg" />
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
               label={capitalizeFirstLetter(user.username)}
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
            <div class="w-full p-2 pt-8 form-control">
               <span class="px-1 py-2">serach by tags</span>
               <MultiSelect items={$tags} bind:value={$selected} name="tags" />
            </div>
         {/if}
      </SidebarWrapper>
   </Sidebar>
{/if}

<div
   class="fixed z-50 w-full p-4 transform -translate-x-1/2 rounded-2xl bottom-1 center custom"
>
   <div
      class="flex flex-col justify-center px-4 outline-none glass rounded-2xl lg:flex-row"
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

<style>
   .custom {
      left: calc(50% - 8rem);
   }
</style>