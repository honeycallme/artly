import { error } from "@sveltejs/kit";
import { getUrls, splitArray } from "$lib/utils/utils";

export const load = async ({ locals }) => {
  const options = {
    loading: true,
    collection: "posts",
    settings: {
      sort: "@random",
      fields: 'collectionId,collectionId,id,content'
    },
    page: 0,
    limit: 16,
    rows: 4,
  };

  if (!options.collection)
    return {
      posts: [],
      options: options,
    };

  let posts = [];

  try {
    posts = await locals.pb
      .collection(options?.collection)
      .getList(options?.page, options?.limit, options?.settings);
    options.page++;

    await getUrls(posts.items, locals.pb);
    const postsArray = splitArray(posts?.items, options?.rows);

    options.loading = false;

    return {
      posts: postsArray,
      options: options,
    };
  } catch (e) {
    console.log(e);
    return error(500, "Internal Server Error");
  }
};
