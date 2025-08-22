import adapter from '@sveltejs/adapter-auto'; // <-- IMPORTA QUESTO
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        // Sostituisci il tuo vecchio adapter con questo:
        adapter: adapter()
    }
};

export default config;