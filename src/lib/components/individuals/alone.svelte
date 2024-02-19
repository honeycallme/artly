<script lang="ts">
   import Comments from "../sections/comments.svelte";
   import toast from 'svelte-french-toast';
   import { enhance } from "$app/forms";
   import Icon from "@iconify/svelte";

   export let post: any;
   export let user: any;
</script>

<div class="w-full center">
   <div
      class="flex flex-col items-center justify-center p-8 shadow-2xl lg:flex-row rounded-3xl drop-shadow-2xl max-w-[60dvw]"
   >
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
               <span class="text-gray-500 hover:text-error"
                  >@{user.username}</span
               >
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

         <!-- likes and saves -->
         <div class="text-2xl">
            <form
               method="post"
               class="flex gap-2"
               use:enhance={({ formData, action }) => {
                  formData.append("id", post.id);
                  
                  const type = action.search.substring(2);
                  if (type == "like") {
                     formData.append("liked", post.liked);
                     post.liked = !post.liked;
                  } else {
                     formData.append("saved", post.saved);
                     post.saved = !post.saved;
                  }

                  return async ({ result, update }) => {

                     if (result.type == "error") {
                        toast.error(result.error.message);

                        if (type == "like")
                           post.liked = !post.liked;
                        else
                           post.saved = !post.saved;
                     } 
                  };
               }}
            >
               <!-- likes -->
               <button formaction={`/post/${post.id}?/like`}>
                  {#if post.liked}
                     <Icon icon="ph:heart-fill" class="text-primary" />
                  {:else}
                     <Icon icon="ph:heart" />
                  {/if}
               </button>

               <!-- saves -->
               <button formaction={`/post/${post.id}?/save`}>
                  {#if post.saved}
                     <Icon icon="prime:bookmark-fill" />
                  {:else}
                     <Icon icon="prime:bookmark" />
                  {/if}
               </button>
            </form>
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
