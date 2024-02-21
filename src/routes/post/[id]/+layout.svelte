<script lang="ts">
    import Alone from "$lib/components/individuals/alone.svelte";
    import type { PageData } from "./$types";
 
    export let data: PageData;
 </script>

<main class="w-full h-full mt-[10dvh]">
      
    <div class="w-full mb-20"
        class:mt-[10%]={data.post.type == "audio"}
    >
         <Alone post={data.post} creator={data.post.expand.creator} user={data.user} />
    </div>

    <div class="text-xl">
        <p class="text-center text-gray-500">more like this :</p>

        <div class="">
            <slot />
        </div>
    </div>
 
 </main>