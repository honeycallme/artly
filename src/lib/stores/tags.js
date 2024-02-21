import { writable } from 'svelte/store';

const data = [
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

export const tags = writable(data);
export const selected = writable([]);