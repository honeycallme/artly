<script lang="ts">
   import Comments from "../sections/comments.svelte";

   export let post: any;
   export let user : any;
</script>

<div class="w-full center">
   <div class="flex flex-col items-center justify-center p-8 shadow-2xl lg:flex-row rounded-3xl drop-shadow-2xl">
      <!-- left -->
      <img src={post.content} alt="post.id" />
    
       <!-- divider -->
      <span class="divider lg:divider-horizontal"></span>
  
      <!-- right -->
      <div class="flex flex-col gap-4 text-xl">

         <!-- creator -->
         <div class="">
            made by 
            <a href="/@{user.username}">
               <span class="text-gray-500 hover:text-error">@{user.username}</span>
            </a>
         </div>

         <!-- description -->
         <div>
            <p>{post.description}</p> 
         </div>

         <!-- tags -->
         <div class="flex flex-wrap gap-2">
            {#each post.tags as tag}
               <span class="p-3 badge">{tag}</span>
            {/each}
         </div>

         <!-- comment section -->
         <div class="mt-4">
            <Comments {post} />
         </div>
      </div>
   </div>
</div>

<style>
   img {
      height: 60dvh;
      border-radius: 5%;
   }
</style>
