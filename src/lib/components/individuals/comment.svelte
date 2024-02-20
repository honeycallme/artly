<script lang="ts">
   import { enhance } from "$app/forms";
   import { Modal } from "flowbite-svelte";
   import toast from "svelte-french-toast";
   import Icon from "@iconify/svelte";
   import { invalidateAll } from '$app/navigation';

   export let comment: any;
   export let replyTo: string;
   export let input: string;

   const creator = comment.expand.creator;
   let reply: any;
   let editing = false;
   let changed = comment.comment;
   let deleteConfirmation = false;
   let hide: boolean = false;

   if (comment.reply) {
      reply = comment.expand.reply.expand.creator.username;
   }

   function startReply() {
      replyTo = comment.id;
      input = `@${creator.username} `;
   }
</script>

<form
   method="post"
   use:enhance={({ formData, action }) => {
      const type = action.search.substring(2);

      if (type == "editComment") {
         formData.append("changed", changed);
         comment.comment = changed;
         editing = false;
      } else {
         hide = true;
      }

      formData.append("comment", comment.id);

      return async ({ result, update }) => {
         if (result.type == "error") {
            toast.error(result.error.message);
        }
        invalidateAll();
      };
   }}
>
   {#if !hide}
      {#if !comment.reply}
         <div class="chat chat-start">
            <!-- image -->
            <div class="chat-image avatar">
               <div class="w-10 rounded-full">
                  <a href={`/@${creator.username}`}>
                     <img alt={creator.username} src={creator.avatar} />
                  </a>
               </div>
            </div>

            <!-- header -->
            <div class="chat-header">
               {creator.username}
            </div>

            <!-- content -->
            {#if !editing}
               <div class="text-lg chat-bubble">{comment.comment}</div>
            {:else}
               <div class="text-lg chat-bubble">
                  <div class="flex items-center gap-2">
                     <input
                        type="text"
                        class="bg-transparent input input-bordered"
                        bind:value={changed}
                     />

                     <button
                        class="btn-square btn btn-neutral btn-sm"
                        on:click|preventDefault={() => {
                           editing = false;
                        }}
                     >
                        <Icon icon="basil:cancel-solid" class="text-2xl" />
                     </button>

                     <button
                        class="btn-square btn btn-neutral btn-sm"
                        type="submit"
                        formaction={`/post/${comment.post}?/editComment`}
                     >
                        <Icon icon="solar:pen-bold" class="text-xl" />
                     </button>
                  </div>
               </div>
            {/if}

            <!-- footer -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="opacity-50 chat-footer">
               <div class="flex gap-2">
                  {#if comment.owned}
                     <button
                        on:click|preventDefault={() => {
                           editing = true;
                        }}
                     >
                        Edit
                     </button>
                     <button
                        on:click|preventDefault={() => {
                           deleteConfirmation = true;
                        }}
                     >
                        Delete
                     </button>
                  {:else}
                     <button on:click|preventDefault={startReply}>
                        Reply
                     </button>
                  {/if}
               </div>
            </div>
         </div>
      {:else}
         <div class="chat chat-end">
            <!-- image -->
            <div class="chat-image avatar">
               <div class="w-10 rounded-full">
                  <a href={`/@${creator.username}`}>
                     <img alt={creator.username} src={creator.avatar} />
                  </a>
               </div>
            </div>

            <!-- header -->
            <div class="chat-header">
               <span class="text-xs opacity-50">(reply to @{reply})</span>
               {creator.username}
            </div>

            <!-- content -->
            {#if !editing}
               <div class="text-lg chat-bubble">{comment.comment}</div>
            {:else}
               <div class="text-lg chat-bubble">
                  <div class="flex items-center gap-2">
                     <input
                        type="text"
                        class="bg-transparent input input-bordered"
                        bind:value={changed}
                     />

                     <button
                        class="btn-square btn btn-neutral btn-sm"
                        on:click|preventDefault={() => {
                           editing = false;
                        }}
                     >
                        <Icon icon="basil:cancel-solid" class="text-2xl" />
                     </button>

                     <button
                        class="btn-square btn btn-neutral btn-sm"
                        type="submit"
                        formaction={`/post/${comment.post}?/editComment`}
                     >
                        <Icon icon="solar:pen-bold" class="text-xl" />
                     </button>
                  </div>
               </div>
            {/if}

            <!-- footer -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="opacity-50 chat-footer">
               <div class="flex gap-2">
                  {#if comment.owned}
                     <button
                        on:click|preventDefault={() => {
                           editing = true;
                        }}
                     >
                        Edit
                     </button>
                     <button
                        on:click|preventDefault={() => {
                           deleteConfirmation = true;
                        }}
                     >
                        Delete
                     </button>
                  {/if}
               </div>
            </div>
         </div>
      {/if}

      <Modal
         bind:open={deleteConfirmation}
         size="xs"
         autoclose={false}
         classBackdrop="bg-transparent"
      >
         <div class="text-center">
            <h3 class="mb-5 text-lg font-normal">
               Are you sure you want to delete this comment ?
            </h3>
            <p class="text-lg text-gray-500">
               this will cause the deletion of all replies connected to this
               comment !
            </p>

            <div class="flex items-center justify-center gap-4 mt-8">
               <button
                  class="btn btn-neutral"
                  on:click={() => {
                     deleteConfirmation = false;
                  }}>Cancel</button
               >
               <button
                  class="btn btn-error"
                  formaction={`/post/${comment.post}?/deleteComment`}
                  >Delete</button
               >
            </div>
         </div>
      </Modal>
   {/if}
</form>
