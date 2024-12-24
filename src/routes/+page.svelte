<script lang="ts">
	import { boilerplates } from '$lib/stores/boilerplates';
	import TemplateCard from '$lib/components/TemplateCard.svelte';
	import ADDCard from '$lib/components/ADDCard.svelte';
	// import AdvertiseCard from '$lib/components/AdvertiseCard.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import { onMount } from 'svelte';
	import { getRandomAd } from '$lib/stores/ads';
	import SectionTwo from '$lib/components/SectionTwo.svelte';

	import LargeAdvertiseCard from '$lib/components/LargeAdvertiseCard.svelte';
	import FilterButtons from '$lib/components/FilterButtons.svelte';

	const sectionTwoData = {
    title: "Trusted by thousands of developers and organizations to:",
    features: [
      {
        emoji: '🔎',
        text: 'Discover Free Open Source Boilerplates'
      },
      {
        emoji: '🪄',
        text: 'Filter by your needs'
      },
      {
        emoji: '✅',
        text: 'Join our Discord Community and get help',
		href: 'https://discord.gg/cNHTKmGSUv'
      },
      {
        emoji: '💸',
        text: 'Submit your boilerplate and get some exposure'
      }
    ]
  };


	// Show ADDCard after first 4 boilerplates
	const ADD_POSITION = 4;
	
	// Random position for advertisement (between 1 and 5)
	const adPosition = Math.floor(Math.random() * 5) + 1;

	// Pagination
	const ITEMS_PER_PAGE = 12;
	let currentPage = 1;
	let loading = false;

	// Define proper types
	interface CardItem {
		type: 'boilerplate' | 'add' | 'advertise';
		content?: Boilerplate;
	}

	// Initial sorting and filtering
	$: sortedBoilerplates = [...boilerplates].sort((a, b) => {
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;
		if (a.sponsored && !b.sponsored) return -1;
		if (!a.sponsored && b.sponsored) return 1;
		return 0;
	});

	// Update Frameworks to exclude price
	$: Frameworks = [
		'All',
		...new Set(boilerplates.flatMap(b => b.framework))
	];

	// Set default values
	let activeFramework = 'All';    // Default to 'All'
	let activePrice = 'Free';      // Default to 'Free'

	// Update filtering logic to handle both framework and price
	$: filteredBoilerplates = sortedBoilerplates
		.filter(item => {
			const frameworkMatch = activeFramework === 'All' 
				? true 
				: Array.isArray(item.framework) 
					? item.framework.includes(activeFramework)
					: item.framework === activeFramework;
					
			const priceMatch = item.price === activePrice;
			
			return frameworkMatch && priceMatch;
		});

	// First create the filtered and paginated cards
	$: paginatedBoilerplatesWithCards = [
		// First add all the boilerplate cards
		...filteredBoilerplates
			.slice(0, currentPage * ITEMS_PER_PAGE)
			.reduce<CardItem[]>((acc, boilerplate, index) => {
				if (index === adPosition) {
					acc.push({ type: 'advertise' });
				}
				acc.push({ type: 'boilerplate', content: boilerplate });
				return acc;
			}, []),
		// Then add the ADDCard at the very end
		{ type: 'add' }
	];

	// Update hasMore calculation to not count the ADDCard
	$: hasMore = (currentPage * ITEMS_PER_PAGE) < filteredBoilerplates.length;

	// Load more function with artificial delay to show loading state
	async function loadMore() {
			loading = true;
			await new Promise(resolve => setTimeout(resolve, 250)); // Simulate network delay
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

	// Get a random ad when the component loads
	const ad = getRandomAd();

	function handleFrameworkFilter(event: CustomEvent<{framework: string}>) {
		activeFramework = event.detail.framework;
		currentPage = 1;
	}

	function handlePriceFilter(event: CustomEvent<{price: string}>) {
		activePrice = event.detail.price;
		currentPage = 1;
	}
</script>

<main class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-10 lg:px-5 py-10">
		<div class="text-center py-12">
			<h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
				Boring Directory for Saas Plates
			</h1>
			<p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				Curated list of SaaS Boilerplates. Free Open Source and Premium Paid SaaS Boilerplates as well.
			</p>
		</div>

		<!-- Advertisement Rectangle -->
		<div class="pb-5 sm:pb-10">
			<Rectangle 
				url="/advertise"
				title="Promoted #1"
				description="Buy this spot for $459 for 3 months."
				imgSrc="/logos/star.svg"
			/>
		</div>


		<!-- Add sidebar and main content layout -->
		<div class="mt-10 mx-10">
			<!-- Main content -->
			<div class="max-w-7xl mx-auto">
				<FilterButtons 
					{activeFramework}
					{activePrice}
					on:filterFramework={handleFrameworkFilter}
					on:filterPrice={handlePriceFilter}
				/>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
					{#each paginatedBoilerplatesWithCards as item}
						{#if item.type === 'boilerplate' && item.content}
						<TemplateCard boilerplate={item.content} {observer} />
						{:else if item.type === 'add'}
							<ADDCard />
						{/if}
						<!-- {:else if item.type === 'advertise'}
							<AdvertiseCard 
								image={ad.image}
								href={ad.href}
							/>
						{/if} -->
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

		<div class="mt-14">
			<LargeAdvertiseCard
				title="Last Promoted Card"
				description="Buy this spot for $399 for 3 months."
				href="/advertise"
				image="/rectangle.webp"
			/>
		</div>
		
		<div
			class="group block bg-white mt-20 rounded-2xl border border-gray-200 transition-colors"
		>
			<div class="max-w-2xl mx-auto text-start py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
					<span class="block">Trusted by thousands of developers and organizations to:</span>
				</h2>
				<SectionTwo 
				title={sectionTwoData.title}
				features={sectionTwoData.features}
			/>
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
