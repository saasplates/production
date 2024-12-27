import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkGfm from 'remark-gfm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	server: {
		hmr: {
			clientPort: 3000
		}
	},
	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'/',
				'/blog',
				'/advertise',
				'/submit',
				'/authors/arjun',
				'/authors/kritika',
				'/boilerplates/next-saas-starter',
				'/boilerplates/nuxt-ui-pro-saas',
				'/boilerplates/remix-saas',
				'/boilerplates/larafast',
				'/boilerplates/nextjs-saas-boilerplate',
				'/boilerplates/nextjs-ultimate-saas',
				'/boilerplates/saasfly'
			],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing pages that are dynamically generated
				if (path === '/sverdle') return;
				
				// Otherwise, fail the build
				throw new Error(message);
			}
		}
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [remarkGfm],
				smartypants: {
					dashes: 'oldschool'
				}
		})
	]
};

export default config;