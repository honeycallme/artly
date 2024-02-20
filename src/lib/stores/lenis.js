import Lenis from "@studio-freight/lenis";
import { writable } from 'svelte/store';

export let lenis = writable();

export function initScroll() {
    const lenis = new Lenis({ duration: 6 });

    function raf(time) {
       lenis.raf(time);
       requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return lenis;
} 

