/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess({}),
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({
			out: 'build',
			precompress: false
		})
	}
};

export default config;
