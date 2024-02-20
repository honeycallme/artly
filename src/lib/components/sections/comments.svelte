<script lang="ts">
   import Comment from "$lib/components/individuals/comment.svelte";
   import Icon from "@iconify/svelte";
   import toast from "svelte-french-toast";
   import { enhance } from "$app/forms";
   import { fade } from "svelte/transition";
   import { invalidateAll } from '$app/navigation';

    export let post: any;
    export let user : any;

    let replyTo : string = '';
    let input : string;
    let loading = false;
</script>

<div class="">

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <details class="collapse collapse-arrow">
        <input type="checkbox" />
        <summary class="text-xl font-medium collapse-title">
            Comments ({post.comments.length})
        </summary>

        <div class="collapse-content" transition:fade>
            <div>
                {#each post.comments as comment, index}
                    <Comment {comment} bind:replyTo={replyTo} bind:input={input} />
                {/each} 
            </div>

            <div class="mt-12">

                <form
                    action="{`/post/${post.id}?/comment`}"
                    method="post"
                    use:enhance={({ formData }) => {
                        loading = true;

                        formData.append("post", post.id);
                        formData.append("reply", replyTo);
                        formData.append("input", input);

                        input = '';
      
                        return async ({ result, update }) => {
                           if (result.type == "error") {
                              toast.error(result.error.message);
                           } else {
                                invalidateAll();
                                loading = false;
                           }
                        };
                     }}
                    class="flex gap-4"
                >
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <img src="{user.avatar}" alt="{user.username}" />
                        </div>
                    </div>
                    <input type="text" placeholder="Type here" class="w-full bg-transparent input input-bordered disabled:bg-transparent" bind:value={input} disabled={loading} />
                    <button class="btn-square btn btn-neutral" disabled={loading}>
                        <Icon icon="bxs:paper-plane" class="text-xl" />
                    </button>
                    
                </form>

            </div>
        </div>
    </details>

</div>