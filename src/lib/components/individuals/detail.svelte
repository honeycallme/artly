<script lang="ts">
    import 'aplayer/dist/APlayer.min.css';
    import { onMount } from 'svelte';

    let Aplayer : any;
    let player : HTMLElement;

    onMount(async () => {
        
        // in case audio post
        if (post.type == "audio") {
            const module = await import('aplayer');
            Aplayer = module.default;

            new Aplayer({
                container: player,
                audio: [
                    {
                        name: post.name,
                        artist: creator.username,
                        url: post.content,
                        cover: '/images/placeholders/audio.jpeg'
                    }
                ],
                mini: true,
            });
        }
    });

   export let post: any;
   export let creator : any;
</script>

<div class="w-[70%] h-full lg:min-w-[50dvh] min-w-[60dvw] center">
   {#if post.type == "image"}
      <img src={post.content} alt="post.id" class="rounded drop-shadow-2xl" />
   {/if}

   {#if post.type == "pdf"}
        <iframe src="{post.content}" frameborder="0" title="{post.name}" class="lg:w-[35dvw] lg:h-[80dvh] h-[50dvh] rounded-3xl drop-shadow-2xl"></iframe>
   {/if}

    {#if post.type == "audio"}
        <div class="center w-[60dvw] h-[50dvh]">
            <div bind:this={player} class="lg:bigger smaller"></div>
        </div>
    {/if}

    {#if post.type == "video"}
    <div class="min-w-[80dvw] lg:min-w-[60dvh]">
        <video src={post.content} class="rounded-3xl drop-shadow-2xl" controls>
            <track kind="captions" />
        </video>
    </div>
    {/if}
</div>

<style>
   .rounded {
      border-radius: 10%;
   }

   .bigger {
        scale: 7;
   }

   .smaller {
        scale : 4;
   }
</style>
