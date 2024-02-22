<script lang="ts">
    import type { PageData } from "./$types";
 
    export let data: PageData;
 
 </script>

<main class="w-full h-full mt-[20dvh]">
      
    <div class="w-full mb-[7%] text-center center">
       <div class="avatar">
          <div
             class="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 lg:w-[15dvw] w-[50dvw]"
          >
             <img src={data.profile.avatar} alt="{data.profile.username}" class="drop-shadow-2xl" />
          </div>
       </div>
 
       <h1 class="mt-4 text-3xl font-bold">{data.profile.name}</h1>
       <h1 class="mt-4 text-xl text-gray-500">@{data.profile.username}</h1>
    </div>

    <div class="">
        <slot />
    </div>
 
 </main>