<script lang="ts">
	import { boilerplates } from '$lib/stores/boilerplates';
	import TemplateCard from '$lib/components/TemplateCard.svelte';
	import ADDCard from '$lib/components/ADDCard.svelte';
	import AdvertiseCard from '$lib/components/AdvertiseCard.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import { onMount } from 'svelte';
	import { getRandomAd } from '$lib/stores/ads';

	// Show ADDCard after first 4 boilerplates
	const ADD_POSITION = 4;
	
	// Random position for advertisement (between 1 and 5)
	const adPosition = Math.floor(Math.random() * 5) + 1;

	// Pagination
	const ITEMS_PER_PAGE = 12;
	let currentPage = 1;
	let loading = false;

	// Sort boilerplates to show featured and sponsored first
	$: sortedBoilerplates = [...boilerplates].sort((a, b) => {
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;
		if (a.sponsored && !b.sponsored) return -1;
		if (!a.sponsored && b.sponsored) return 1;
		return 0;
	});

	// Add type definition for card items
	type CardItem = {
		type: 'boilerplate' | 'add' | 'advertise';
		content?: any; // or proper Boilerplate type if available
	};

	// Add new filtering state
	const categories = ['Landing Page', 'Admin Panel', 'Authentication', 'Dashboard', 'E-commerce'];
	let selectedCategories: string[] = [];
	let showFeatured = false;
	let showSponsored = false;

	// Filter boilerplates based on selected filters
	$: filteredBoilerplates = sortedBoilerplates.filter(boilerplate => {
		const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(boilerplate.category);
		const featuredMatch = !showFeatured || boilerplate.featured;
		const sponsoredMatch = !showSponsored || boilerplate.sponsored;
		return categoryMatch && featuredMatch && sponsoredMatch;
	});

	// Update pagination to use filtered boilerplates
	$: paginatedBoilerplatesWithCards = filteredBoilerplates
		.slice(0, currentPage * ITEMS_PER_PAGE)
		.reduce<CardItem[]>((acc, boilerplate, index) => {
			if (index === adPosition) {
				acc.push({ type: 'advertise' });
			}
			
			acc.push({ type: 'boilerplate', content: boilerplate });
			
			if (index === ADD_POSITION) {
				acc.push({ type: 'add' });
			}
			return acc;
		}, []);

	// Update hasMore to use filtered boilerplates length
	$: hasMore = currentPage * ITEMS_PER_PAGE < filteredBoilerplates.length;

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

	// Clear filters function
	function clearFilters() {
		selectedCategories = [];
		showFeatured = false;
		showSponsored = false;
		currentPage = 1;
	}

	// Get a random ad when the component loads
	const ad = getRandomAd();
</script>

<main class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-10 lg:px-5 py-12">
		<div class="text-center py-12">
			<h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
				Boring Directory for Saas Plates
			</h1>
			<p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				Curated list of SaaS Boilerplates. Free Open Source and Premium Paid SaaS Boilerplates as well.
			</p>
		</div>

		<!-- Advertisement Rectangle -->
		<div class="pb-10 sm:pb-20">
			<Rectangle 
				url="https://0auth.example"
				title="Supabase"
				description="an open source Firebase alternative - Start your project and serve in a weekend."
			/>
		</div>

		<hr />

		<!-- Add sidebar and main content layout -->
		<div class="mt-28 lg:grid lg:grid-cols-[280px,1fr] lg:gap-8">
			<!-- Sidebar -->
			<div class="hidden lg:block">
				<div class="sticky top-6">
					<div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
						<div class="p-6">
							<h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
							
							<!-- Categories -->
							<div class="space-y-4">
								<div>
									<h4 class="text-sm font-medium text-gray-700 mb-2">Categories</h4>
									<div class="space-y-2">
										{#each categories as category}
											<label class="flex items-center">
												<input
													type="checkbox"
													class="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
													bind:group={selectedCategories}
													value={category}
												/>
												<span class="ml-2 text-sm text-gray-600">{category}</span>
											</label>
										{/each}
									</div>
								</div>

								<!-- Type Filter -->
								<div>
									<h4 class="text-sm font-medium text-gray-700 mb-2">Type</h4>
									<div class="space-y-2">
										<label class="flex items-center">
											<input
												type="checkbox"
												class="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
												bind:checked={showFeatured}
											/>
											<span class="ml-2 text-sm text-gray-600">Featured</span>
										</label>
										<label class="flex items-center">
											<input
												type="checkbox"
												class="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
												bind:checked={showSponsored}
											/>
											<span class="ml-2 text-sm text-gray-600">Sponsored</span>
										</label>
									</div>
								</div>

								<!-- Clear Filters Button -->
								<button
									class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
									on:click={clearFilters}
								>
									Clear Filters
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Main content -->
			<div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
					{#each paginatedBoilerplatesWithCards as item}
						{#if item.type === 'boilerplate'}
							<TemplateCard boilerplate={item.content} {observer} hideFeatures={true} />
						{:else if item.type === 'add'}
							<ADDCard />
						{:else if item.type === 'advertise'}
							<AdvertiseCard 
								image={ad.image}
								description={ad.description}
								href={ad.href}
							/>
						{/if}
					{/each}
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
								Show More Boilerplates
							{/if}
						</button>
					</div>
				{/if}
			</div>
		</div>

		<div
			class="group block bg-white mt-20 rounded-2xl border border-gray-200 transition-colors"
		>
			<div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
					<span class="block">Have a boilerplate to share?</span>
					<span class="block">Submit it today!</span>
				</h2>
				<p class="mt-4 text-lg leading-6 text-gray-600">
					Share your work with thousands of developers and get recognized.
				</p>
				<a 
					href="/submit"
					class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 group-hover:bg-gray-800 sm:w-auto"
				>
					Submit Your Boilerplate
				</a>
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
