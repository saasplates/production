<script lang="ts">
	import { trackInteraction } from '$lib/discord';
	import { trackClickAndGetCount } from '$lib/redis';

	async function handleLinkClick(linkType: string, url: string) {
		try {
			// Track click in Redis
			const clickCount = await trackClickAndGetCount(`footer:${linkType}`);
			
			// Send to Discord webhook
			await trackInteraction({
				page: window.location.pathname,
				element: 'footer-link',
				action: 'clicked',
				additionalInfo: `Clicked ${linkType} link: ${url}\nTotal Clicks: ${clickCount}`
			});
		} catch (error) {
			console.error(`Error tracking ${linkType} link click:`, error);
		}
	}
</script>

<footer class="bg-white border-t border-gray-300">
	<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
		<div class="flex justify-center space-x-6 md:order-2">
			<a href="/about" class="text-gray-500 hover:text-gray-600">
				About
			</a>
			<a 
				href="https://twitter.com/saasplates" 
				class="text-gray-500 hover:text-gray-600"
				on:click={() => handleLinkClick('twitter', 'https://twitter.com/saasplates')}
			>
				<span class="sr-only">Twitter</span>
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
				</svg>
			</a>
			<a 
				href="/discord" 
				class="text-gray-500 hover:text-gray-600"
				on:click={() => handleLinkClick('discord', '/discord')}
			>
				<span class="sr-only">Discord</span>
				<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
				</svg>
			</a>
		</div>
		<div class="mt-8 md:mt-0 md:order-1">
			<div class="flex flex-col items-center md:items-start space-y-2">
				<p class="text-center text-base text-gray-400">
					&copy; 2024 SaasPlates. Maintained by <a 
						href="https://x.com/arjvnz" 
						class="text-gray-700 hover:text-gray-900 hover:underline font-medium"
						on:click={() => handleLinkClick('author-twitter', 'https://x.com/arjvnz')}
					>
						Arjun Aditya
					</a>.
				</p>
				<div class="flex items-center gap-1 pt-3 text-sm text-gray-500">
					<span class="border-neutral-200 border rounded-md px-2 py-1">Deployed on{" "}
					<a 
						href="https://zerops.io" 
						target="_blank" 
						rel="noopener"
						class="text-gray-700 hover:text-gray-900 font-medium"
						on:click={() => handleLinkClick('zerops', 'https://zerops.io')}
					>
						Zerops
					</a>
					</span>
				</div>
			</div>
		</div>
	</div>
</footer>
