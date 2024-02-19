<script lang="ts">
   import Post from "$lib/components/individuals/post.svelte";
   import InfiniteLoading from "svelte-infinite-loading";
   import { Gallery } from "flowbite-svelte";
   import { onMount } from "svelte";

   export let data: any;
   export let loading: boolean;
   let size: number;

   const options = data.options;

   async function infiniteHandler({ detail: { loaded, complete } }) {
      if (data.posts.length < options?.rows && options.page > 1) {
         loading = false;
         complete();
         return;
      }

      await fetch(`/api/${options?.collection}`, {
         method: "POST",
         body: JSON.stringify({ options }),
         headers: {
            "content-type": "application/json",
         },
      })
         .then((res) => res.json())
         .then((res) => {
            if (options?.settings.sort !== "@random") options.page++;

            if (
               res.length >= options.rows &&
               res[0][0]?.id != data.posts[0][0]?.id
            ) {
               loaded();
               loading = false;

               data.posts = [...data.posts, ...res];
            } else {
               loading = false;
               complete();
            }
         });
   }

   onMount(() => {
      window.scrollTo(0, 0);
   });

   $: {
      if (size < 768) {
         options.rows = 1;
         options.limit = 5;
      }
   }
</script>

<svelte:window bind:innerWidth={size} />

{#if data.posts.length < 1 && !loading}
   <div class="w-full h-full overflow-hidden screen center">
      <span class="text-xl text-center text-gray-600"
         >no {options?.collection} to show.</span
      >
   </div>
{:else}
   <Gallery class="grid-cols-{options?.rows} gap-4 p-[7%] m-auto">
      {#each data.posts as section, index}
         <Gallery items={section} let:item data-num={index + 1}>
            <Post data={item} />
         </Gallery>
      {/each}

      {#if data.posts.length >= options.rows}
         <InfiniteLoading on:infinite={infiniteHandler} distance={300} />
      {/if}
   </Gallery>
{/if}
