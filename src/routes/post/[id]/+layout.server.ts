import { error, fail, redirect, type RequestHandler } from "@sveltejs/kit";
import { getAvatar, getUrl, getUrls, splitArray } from "$lib/utils/utils.js";

export const load = async ({ locals, url }) => {
  // post loading

  let post: any;
  const id = url.pathname.split("/").pop();
  const settings = {
    expand: "creator,comments(post).creator,comments(post).reply.creator",
    fields:
      "*, expand.creator.id, expand.creator.collectionId, expand.creator.avatar, expand.creator.username, expand.comments(post).*, expand.comments(post).expand.creator.id, expand.comments(post).expand.creator.collectionId, expand.comments(post).expand.creator.avatar, expand.comments(post).expand.creator.username, expand.comments(post).expand.reply.expand.creator.username",
  };

  // first load post
  // then update view count

  try {
    post = await locals.pb.collection("posts").getOne(id, settings);
    getUrl(post, locals.pb);
    getAvatar(post.expand.creator, locals.pb);

    post.comments = [];
    if (post.expand["comments(post)"]) {
      post.comments = post.expand["comments(post)"];

      post.comments.forEach((comment: any) => {
        getAvatar(comment.expand.creator, locals.pb);

        if (comment.creator == locals.user.id) comment.owned = true;
      });
    }

    post.views++;
  } catch (e) {
    console.log("errror : ", e);
    return error(404, "Unknown post");
  }

  try {
    await locals.pb.collection("posts").update(id, {
      views: post.views,
    });
  } catch (e) {
    console.log("errror : ", e);
    return error(404, "Error while updating view count");
  }

  // saves + likes loading

  let likes;
  let saves;

  try {
    likes = await locals.pb.collection("likes").getList(1, 1, {
      filter: `post.id='${post.id}'`,
      fields: "user.id",
    });

    saves = await locals.pb.collection("saves").getList(1, 1, {
      filter: `post.id='${post.id}'`,
      fields: "user.id",
    });

    post.likes = likes.totalItems;
    post.saves = saves.totalItems;

    post.liked =
      likes.items.filter((like: any) => like.user === locals.user.id).length >
      0;
    post.saved =
      saves.items.filter((save: any) => save.user === locals.user.id).length >
      0;
  } catch (e) {
    console.log("errror : ", e);
    return error(400, "Something went wrong");
  }

  // posts alique loading

  const options = {
    loading: true,
    collection: "posts",
    settings: {
      sort: "-created",
      filter: post.tags.map((tag: string) => `tags~'${tag}'`).join("||"),
      fields: "collectionId,id,content",
    },
    page: 0,
    limit: 9,
    rows: 3,
  };

  if (!options.collection || post.tags.length === 0) {
    options.loading = false;
    return {
      post: post,
      posts: [],
      options: options,
    };
  }

  let posts = [];
  let postsArray = [];

  try {
    posts = await locals.pb
      .collection(options?.collection)
      .getList(options?.page, options?.limit, options?.settings);
    options.page++;

    await getUrls(posts.items, locals.pb);
    postsArray = splitArray(posts?.items, options?.rows);

    options.loading = false;
  } catch (e) {
    console.log(e);
    return error(500, "Internal Server Error");
  }

  return {
    post: post,
    posts: postsArray,
    options: options,
  };
};
