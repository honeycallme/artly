<script lang="ts">
   import { enhance } from "$app/forms";
   import toast from "svelte-french-toast";
   import { Modal } from "flowbite-svelte";

   export let data: any;
   let deleteConfirmation = false;
</script>

<div class="w-full h-full center">
   <h1 class="text-5xl font-bold">settings</h1>

   <div class="m-8 center">
      <button
         class="btn btn-wide btn-error"
         on:click={() => {
            deleteConfirmation = true;
         }}>Delete my account</button
      >
   </div>
</div>

<Modal bind:open={deleteConfirmation} size="xs" autoclose={false}>
   <div class="text-center">
      <form
         method="post"
         use:enhance={({}) => {
            toast.loading("Deleting profile ...", { duration: 1500 });
            deleteConfirmation = false;

            return async ({ result, update }) => {
               toast.success("Profile deleted successfully");
            };
         }}
         class="center"
      >
         <h3 class="mb-5 text-lg font-normal">
            Are you sure you want to delete
            <span class="text-error">
               @{data.user.username}
            </span>
         </h3>
         <p class="text-lg text-gray-500">
            this will cause the deletion of all data connected to this user !
         </p>

         <div class="flex gap-4 mt-8">
            <button class="btn btn-neutral" on:click={() => {deleteConfirmation = false}}>Cancel</button>
            <button class="btn btn-error" formaction="?/delete">Delete</button>
         </div>
      </form>
   </div>
</Modal>
