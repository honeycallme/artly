<script lang="ts">
    import Post from "$lib/components/individuals/post.svelte";
    import InfiniteLoading from 'svelte-infinite-loading';
    import { Gallery } from "flowbite-svelte";
 
    let page = 1;
    let data = { posts: [] };

    export let settings : any;
    export let collection : string;
    export let loading : boolean;
    export let limit : number;
 
    async function infiniteHandler({ detail: { loaded } }) {
 
       const options = {
          page : page,
          settings : settings,
          collection : collection,
          limit : limit * limit
       };

        if (data.posts.length < limit * limit && page > 1)
            return;
 
       await fetch(`/api/${collection}`, {
          method: 'POST',
             body: JSON.stringify({ options }),
             headers: {
                 'content-type': 'application/json',
             },
       })
          .then((res) => res.json())
          .then((res) => {

            if (settings.sort !== '@random')
                page++;
            
             loaded();
 
             loading = false;
 
             data.posts = [...data.posts, ...res];
          }
       );
     }
 </script>


{#if data.posts.length < 1 && !loading}
    <div class="w-full h-full overflow-hidden screen center">
        <span class="text-xl text-center text-gray-600">no {collection} to show.</span>
    </div>
{/if}


<Gallery class="grid-cols-{limit} gap-4 p-24">
    {#each data.posts as section, index}
        <Gallery items={section} let:item data-num={index + 1}>
            <Post data={item} />
        </Gallery>
    {/each}

    <InfiniteLoading on:infinite={infiniteHandler} distance={200} />
</Gallery>