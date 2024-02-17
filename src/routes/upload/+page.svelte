<script lang="ts">
   import { enhance } from "$app/forms";
   import { MultiSelect } from "flowbite-svelte";
   import toast from 'svelte-french-toast';
   import Upload from "$lib/components/individuals/upload.svelte";

   let tags = [
      { value: "us", name: "United States" },
      { value: "ca", name: "Canada" },
      { value: "fr", name: "France" },
      { value: "jp", name: "Japan" },
      { value: "en", name: "England" },
   ];
   
   let selected: string[];
   let file : File;

</script>

<div class="w-full h-full center">
   <div class="w-1/2 h-1/2">
      <!-- upload form -->

      <form
         action="?/upload"
         method="post"
         class="flex flex-col w-full h-full lg:flex-row"
         use:enhance={({ formElement }) => {

            toast.loading("Uploading file...", { duration: 1500 });
            
            return async ({ result, update }) => {

               if (result.type == "error") {
                  toast.error(result.error.message);
               } else {
                  toast.success("File uploaded successfully");
                  
                  formElement.reset();
                  file = undefined;
                  selected = [];
               }

            }
         }}
         enctype="multipart/form-data"
      >
         <!-- left part -->
         <Upload bind:file={file} />

         <!-- divider -->
         <span class="divider lg:divider-horizontal"></span>

         <!-- right part -->
         <div class="flex flex-col justify-center w-full h-full gap-4">

            <div>
               <label for="tags" class="p-2 text-gray-500">tags (optional) :</label>
               <MultiSelect items={tags} bind:value={selected} name="tags" />
            </div>

            <div>
               <label for="description" class="p-2 text-gray-500">description (optional) :</label>
               <textarea class="w-full bg-transparent textarea textarea-bordered" placeholder="..." name="description"></textarea>
            </div>

            <div>
               <button class="w-full btn" disabled={!file}>upload</button>
            </div>

         </div>
      </form>
   </div>
</div>
