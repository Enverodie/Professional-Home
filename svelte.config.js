import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(
		// {
		// 	scss: {
		// 		includePaths: ['src/scss'],
		// 		prependData: `@use 'src/lib/styles/global.scss';`
		// 	}
		// }
	),
	kit: {
		adapter: adapter()
	}
};

export default config;
