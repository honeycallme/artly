<script lang="ts">
   import { enhance } from "$app/forms";
   import { MultiSelect } from "flowbite-svelte";
   import toast from "svelte-french-toast";
   import Upload from "$lib/components/individuals/upload.svelte";
   import { tags } from "$lib/stores/tags";

   const types = [
      { value : 'image', label : 'Image' },
      { value : 'video', label : 'Video' },
      { value : 'audio', label : 'Audio' },
      { value : 'pdf', label : 'Book' },
   ]

   let selected: string[];
   let file: File;
   let name: string;
   let type: string;
</script>

<div class="w-full h-full center">
   <div class="w-[60%] h-[60%]">
      <!-- upload form -->

      <form
         action="?/upload"
         method="post"
         class="flex flex-col w-full h-full lg:flex-row"
         use:enhance={({ formElement, formData, cancel }) => {
            
            let file = formData.get("content");
            let type = formData.get("type");

            const FILE_SIZE_LIMIT = 8242880; 
            
            if (!file || !type) {
               toast.error("Please select a file and type of post");
               cancel();
               return;
            }
            
            if (file.size > FILE_SIZE_LIMIT) {
               toast.error("File size is too large");
               cancel();
               return;
            }

            console.log(file);
            console.log(type);

            let error = false;
            const videoMimeRegex = /^video\//;
            const imageMimeRegex = /^image\//;
            const audioMimeRegex = /^audio\//;
            const pdfMimeType = 'application/pdf';

            switch (type) {
               case "image":
                  if (!imageMimeRegex.test(file.type)) error = true;
                  break;
               case "video":
                  if (!videoMimeRegex.test(file.type)) error = true;
                  break;
               case "audio":
                  if (!audioMimeRegex.test(file.type)) error = true;
                  break;
               case "pdf":
                  if (file.type != pdfMimeType) error = true;
                  break;       
            }

            if (error) {
               toast.error("Please specify the correct type of file");
               cancel();
               return;
            }
            
            toast.loading("Uploading file...", { duration: 2000 });
            return async ({ result, update }) => {
               if (result.type == "error") {
                  toast.error(result.error.message);
               } else {
                  toast.success("File uploaded successfully");

                  formElement.reset();
                  file = undefined;
                  type = "";
                  selected = [];
               }
            };
         }}
         enctype="multipart/form-data"
      >
         <!-- left part -->
         <Upload bind:file />

         <!-- divider -->
         <span class="divider lg:divider-horizontal"></span>

         <!-- right part -->
         <div class="flex flex-col justify-center w-full h-full gap-4">
            <div>
               <label for="name" class="p-2 text-gray-500">name</label>
               <input
                  class="w-full bg-transparent input input-bordered"
                  placeholder="..."
                  name="name"
                  required
                  bind:value={name}
               />
            </div>

            <div>
               <label for="type" class="p-2 text-gray-500">type of post</label>
               <select class="w-full bg-transparent select select-bordered" name=type required bind:value={type}>
                  <option disabled selected>...</option>

                  {#each types as type}
                     <option value={type.value}>{type.label}</option>
                  {/each}
                </select>
            </div>

            <div>
               <label for="tags" class="p-2 text-gray-500"
                  >tags (optional) :</label
               >
               <MultiSelect items={$tags} bind:value={selected} name="tags" />
            </div>

            <div>
               <label for="description" class="p-2 text-gray-500"
                  >description (optional) :</label
               >
               <textarea
                  class="w-full bg-transparent textarea textarea-bordered"
                  placeholder="..."
                  name="description"
               ></textarea>
            </div>

            <div>
               <button class="w-full btn" disabled={!file || !name || type == '...'}>upload</button>
            </div>
         </div>
      </form>
   </div>
</div>
