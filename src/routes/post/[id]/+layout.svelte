<script lang="ts">
    import Alone from "$lib/components/individuals/alone.svelte";
    import type { PageData } from "./$types";
 
    export let data: PageData;
 
 </script>

<main class="w-full h-full mt-[15dvh]">
      
    <div class="w-full mb-16">
         <Alone post={data.post} user={data.post.expand.creator} />
    </div>

    
    <div class="text-xl">
        <p class="text-center text-gray-500">more like this :</p>

        <div class="-mt-[5%]">
            <slot />
        </div>
    </div>
 
 </main>