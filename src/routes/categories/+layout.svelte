<script lang="ts">
   import { page } from "$app/stores";
</script>

<div>
   <div class="m-8 center">
      <div role="tablist" class="bg-transparent tabs tabs-boxed">
         <a
            role="tab"
            class="text-xl tab hover:text-error {$page.params.category ==
            'image'
               ? 'tab-active'
               : ''}"
            href="/categories/image">Images</a
         >
         <a
            role="tab"
            class="text-xl tab hover:text-error {$page.params.category ==
            'video'
               ? 'tab-active'
               : ''}"
            href="/categories/video">Videos</a
         >
         <a
            role="tab"
            class="text-xl tab hover:text-error {$page.params.category ==
            'audio'
               ? 'tab-active'
               : ''}"
            href="/categories/audio">Audios</a
         >
         <a
            role="tab"
            class="text-xl tab hover:text-error {$page.params.category == 'pdf'
               ? 'tab-active'
               : ''}"
            href="/categories/pdf">Books</a
         >
      </div>
   </div>

   <slot />
</div>
