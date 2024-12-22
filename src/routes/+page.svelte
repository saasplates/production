<script lang="ts">
	import { templates } from '$lib/stores/templates';
	import TemplateCard from '$lib/components/TemplateCard.svelte';
	import ADDCard from '$lib/components/ADDCard.svelte';
	import { onMount } from 'svelte';

	// Randomly decide whether to show CTA after hero or among templates
	const showCtaAfterHero = Math.random() > 1;
	
	// If showing among templates, pick a random position
	const ctaPosition = Math.floor(Math.random() * (templates.length + 1));

	// Pagination
	const ITEMS_PER_PAGE = 6;
	let currentPage = 1;
	let loading = false;

	// Sort templates to show featured and sponsored first
	$: sortedTemplates = [...templates].sort((a, b) => {
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;
		if (a.sponsored && !b.sponsored) return -1;
		if (!a.sponsored && b.sponsored) return 1;
		return 0;
	});

	// Get paginated templates
	$: paginatedTemplates = sortedTemplates.slice(0, currentPage * ITEMS_PER_PAGE);
	$: hasMore = paginatedTemplates.length < sortedTemplates.length;

	// Load more function with artificial delay to show loading state
	async function loadMore() {
		loading = true;
		await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
		currentPage += 1;
		loading = false;
	}

	// Intersection Observer for lazy loading images
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement;
						img.src = img.dataset.src!;
						img.onload = () => {
							img.classList.remove('opacity-0');
							observer.unobserve(img);
						};
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
	});
</script>

<main class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="text-center">
			<h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
				Premium SaaS Templates
			</h1>
			<p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				Professional, responsive templates built with Svelte and TailwindCSS. Perfect for modern web applications, dashboards, and landing pages.
			</p>
		</div>

		<div class="mt-12">
			<h2 class="sr-only">Our Templates</h2>
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-lg lg:max-w-none mx-auto">
				{#each paginatedTemplates as template, i}
					{#if !showCtaAfterHero && i === ctaPosition}
						<ADDCard />
					{/if}
					<TemplateCard {template} {observer} />
				{/each}
				{#if !showCtaAfterHero && ctaPosition === paginatedTemplates.length}
					<ADDCard />
				{/if}
			</div>

			{#if hasMore}
				<div class="mt-12 text-center">
					<button
						on:click={loadMore}
						class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
						disabled={loading}
					>
						{#if loading}
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Loading...
						{:else}
							Show More Templates
						{/if}
					</button>
				</div>
			{/if}
		</div>

		<div
			class="group block bg-white mt-20 rounded-2xl border border-gray-200 transition-colors"
		>
			<div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
					<span class="block">Have a template to share?</span>
					<span class="block">Submit it today!</span>
				</h2>
				<p class="mt-4 text-lg leading-6 text-gray-600">
					Share your work with thousands of developers and earn recognition for your design skills.
				</p>
				<span
					class="pointer-events-none mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 group-hover:bg-gray-800 sm:w-auto"
				>
					Submit Your Template
				</span>
			</div>
		</div>
<!-- 
		<div class="mt-20 text-center">
			<p class="text-base text-gray-500">Trusted by developers from</p>
			<div class="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
				<div class="col-span-1 flex justify-center items-center">
					<img class="h-8" src="/logos/google.svg" alt="Google" />
				</div>
				<div class="col-span-1 flex justify-center items-center">
					<img class="h-8" src="/logos/microsoft.svg" alt="Microsoft" />
				</div>
				<div class="col-span-1 flex justify-center items-center">
					<img class="h-8" src="/logos/amazon.svg" alt="Amazon" />
				</div>
				<div class="col-span-1 flex justify-center items-center">
					<img class="h-8" src="/logos/meta.svg" alt="Meta" />
				</div>
			</div>
		</div> -->
	</div>
</main>
