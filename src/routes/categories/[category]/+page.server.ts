import { error, redirect } from "@sveltejs/kit";
import { getUrls, splitArray } from "$lib/utils/utils";

export const load = async ({ locals, url }) => {
  const category = url.pathname.split("/")[2];
  if (category != "image" && category != "video" && category != "pdf" && category != "audio") {
      return redirect(303, '/feed');
  }

  const options = {
    loading: true,
    collection: "posts",
    settings: {
      sort: "@random",
      fields: 'collectionId,id,content,type,name',
      filter: `type = '${category}'`
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
