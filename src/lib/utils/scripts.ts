import PocketBase from 'pocketbase';

const pb = new PocketBase("https://artly.pockethost.io");

// get all posts

async function getPosts()
{
    let posts;

    try {
        posts = await pb.collection('posts').getFullList({
            sort: '-created',
        });

    } catch (e) {
        console.log(e);
    }

    return posts;
}

// update each post

function generateName(): string {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    
    const wordsCount = Math.floor(Math.random() * 5) + 2; 
    const loremWords = loremIpsum.split(' ').slice(0, wordsCount);
    
    for (let i = loremWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [loremWords[i], loremWords[j]] = [loremWords[j], loremWords[i]];
    }

    return loremWords.join(' ');
}

function generateDescription(): string {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
    
    const wordsCount = Math.floor(Math.random() * 31) + 10; 
    const loremWords = loremIpsum.split(' ').slice(0, wordsCount);
    
    for (let i = loremWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [loremWords[i], loremWords[j]] = [loremWords[j], loremWords[i]];
    }

    return loremWords.join(' ');
}


function generateTags(): string[] {
    const tags = [
        { value: "art", name: "Art" },
        { value: "cute", name: "Cute" },
        { value: "painting", name: "Painting" },
        { value: "photography", name: "Photography" },
        { value: "film", name: "Film" },
        { value: "tiktok", name: "Tiktok's" },
        { value: "manga", name: "Manga" },
        { value: "comics", name: "Comics" },
        { value: "alternative", name: "Alternative" },
        { value: "aesthetic", name: "Aesthetic" },
        { value: "rap", name: "Rap" },
        { value: "rock", name: "Rock" },
        { value: "lofi", name: "Lofi" }
     ];

    const numTags = Math.floor(Math.random() * 3) + 1;
    const selectedTags = tags.sort(() => 0.5 - Math.random()).slice(0, numTags).map(tag => tag.value);

    return selectedTags;
}


async function updatePost(post : any) {
    const input = {
        name : generateName(),
        description : generateDescription(),
        tags : generateTags(),
        type : "image"
    }

    try {
        await pb.collection('posts').update(post.id, input);
    
    } catch (e) {
        console.log(e);
    }
}

// main loop 

async function handler() {
    const posts = await getPosts();

    if (!posts) return;

    for (let post of posts) {
        await updatePost(post);
    }

    console.log("All posts updated");
}

// run the main loop

// handler();
