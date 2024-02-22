<script lang="ts">
    import Post from "$lib/components/individuals/post.svelte";
    import InfiniteLoading from "svelte-infinite-loading";
    import { Gallery } from "flowbite-svelte";
    import { selected } from "$lib/stores/tags";

    export let data: any;
    export let loading: boolean;
    let size: number;
    let tagSearch = false;
    let baseFilter: string;

    const options = data.options;

    function search(tags) {
        if (tags.length > 0) {
            if (!tagSearch)
                baseFilter = options.settings.filter
                    ? options.settings.filter
                    : "";

            options.settings.filter = tags
                .map((tag: string) => `tags~'${tag}'`)
                .join("&&");

            if (baseFilter != "") {
                options.settings.filter = `(${baseFilter})&&(${options.settings.filter})`;
            }

            options.page = 0;
            data.posts = [];
            loading = true;
            tagSearch = true;

            infiniteHandler({
                detail: { loaded: () => {}, complete: () => {} },
            });
        } else {
            if (!tagSearch) return;

            options.settings.filter = baseFilter;
            options.page = 0;
            data.posts = [];
            loading = true;
            tagSearch = false;

            infiniteHandler({
                detail: { loaded: () => {}, complete: () => {} },
            });
        }
    }

    $: search($selected);

    async function infiniteHandler({ detail: { loaded, complete } }) {
        if (data.posts.length < options?.rows && options.page > 1) {
            loading = false;
            complete();
            return;
        }

        await fetch(`/api/${options?.collection}`, {
            method: "POST",
            body: JSON.stringify({ options }),
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (options?.settings.sort !== "@random") options.page++;

                if (res.length >= options.rows) {
                    if (
                        data.posts.lenght > 0 &&
                        res[0][0]?.id == data.posts[0][0]?.id
                    )
                        complete();

                    loaded();
                    loading = false;

                    data.posts = [...data.posts, ...res];
                } else {
                    data.posts = [...data.posts, ...res];
                    loading = false;
                    complete();
                }
            });
    }

    $: {
        if (size < 768) {
            options.rows = 1;
            options.limit = 5;
        }
    }
</script>

<svelte:window bind:innerWidth={size} />

{#if data.posts && data.posts.length < 1 && !loading}
    <div class="w-full h-full my-4 overflow-hidden center">
        <span class="text-xl text-center text-gray-600"
            >no {options?.collection} to show.</span
        >
    </div>
{:else}
    <Gallery class="grid-cols-{options?.rows} m-auto gap-4 px-[7%] py-[1%]">
        {#each data.posts as section, index}
            <Gallery items={section} let:item data-num={index + 1}>
                <Post data={item} options={{ actions : true }} />
            </Gallery>
        {/each}

        {#if data.posts.length >= options.rows}
            <InfiniteLoading on:infinite={infiniteHandler} distance={300} />
        {/if}
    </Gallery>
{/if}
