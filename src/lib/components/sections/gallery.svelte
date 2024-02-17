<script lang="ts">
   import Post from "$lib/components/individuals/post.svelte";
   import InfiniteLoading from "svelte-infinite-loading";
   import { Gallery } from "flowbite-svelte";

   export let data: any;
   export let loading: boolean;

   const options = data.options;

   async function infiniteHandler({ detail: { loaded } }) {
      if (data.posts.length < options?.limit && options?.page > 1) return;

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

            loaded();
            loading = false;

            data.posts = [...data.posts, ...res];
         });
   }
</script>

{#if data.posts.length < 1 && !loading}
   <div class="w-full h-full overflow-hidden screen center">
      <span class="text-xl text-center text-gray-600"
         >no {options?.collection} to show.</span
      >
   </div>
{/if}

<Gallery class="grid-cols-{options?.rows} gap-4 p-[7%]">
   {#each data.posts as section, index}
      <Gallery items={section} let:item data-num={index + 1}>
         <Post data={item} />
      </Gallery>
   {/each}

   <InfiniteLoading on:infinite={infiniteHandler} distance={300} />
</Gallery>
