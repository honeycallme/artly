import { writable } from 'svelte/store';

const data = [
    { value: "us", name: "United States" },
    { value: "ca", name: "Canada" },
    { value: "fr", name: "France" },
    { value: "jp", name: "Japan" },
    { value: "en", name: "England" },
 ];

export const tags = writable(data);
export const selected = writable([]);