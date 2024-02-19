<script lang="ts">
   import { enhance, applyAction } from "$app/forms";
   import toast from 'svelte-french-toast';
   import Icon from "@iconify/svelte";

   export let data : any;
   let preview : HTMLImageElement;

   const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			preview.src = src;
		}
	};

</script>

<div class="w-full h-full center">
   <form
      action="?/update"
      method="post"
      enctype="multipart/form-data"
      use:enhance={({ formElement }) => {

         toast.loading("Updating profile ...", { duration: 1500 });
         
         return async ({ result, update }) => {

            if (result.type == "error") {
               toast.error(result.error.message);
            } else {
               toast.success("Profile updated successfully");
               await applyAction(result);
            }

         }
      }}
      class="w-1/4 center"
   >

      <!-- avatar section -->
      <label for="avatar">
         <div class="avatar">
            <label for="avatar" class="absolute bottom-5 right-5 hover:cursor-pointer">
               <span class="btn btn-circle btn-md btn-error">
                  <Icon icon="heroicons:pencil-solid" class="size-8"/>
               </span>
            </label>

            <div class="rounded-full w-80 ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="{data.user.avatar}" alt="{data.user.username}" bind:this={preview}/>
            </div>
   
            <input type="file" id="avatar" name="avatar" class="hidden" on:change={showPreview} value="" accept="image/*">
          </div>
      </label>

      <!-- text inputs -->
      <div class="w-full m-8 center">

         <div class="w-full pb-4 center">
            <label for="name" class="p-2 text-gray-500">name :</label>
            <input type="text" id="name" name="name" class="w-full text-center bg-transparent input input-bordered" value="{data.user.name}" required>
         </div>

         <div class="w-full center">
            <label for="username" class="p-2 text-gray-500">username :</label>
            <input type="text" id="username" name="username" class="w-full text-center bg-transparent input input-bordered" value="{data.user.username}" required>
         </div>
      </div>

      <button class="btn btn-wide btn-error" type="submit">Save</button>
   </form>
</div>
