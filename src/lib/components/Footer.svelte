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
					<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
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
