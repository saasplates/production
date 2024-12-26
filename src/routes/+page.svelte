<script lang="ts">
	import { boilerplates } from '$lib/stores/boilerplates';
	import { scrollPosition } from '$lib/stores/scroll';
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
        text: 'Submit your boilerplate and get some exposure',
		href: '/submit'
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

	// Default filter values
	let activeFramework = 'All';    // Default to 'All'
	let activePrices = ['Free', 'Paid'];  // Both selected by default

	// Framework options are dynamically generated from boilerplates
	$: Frameworks = [
		'All',
		...new Set(boilerplates.flatMap(b => b.framework))
	];

	// Update filtering logic to handle multiple price selections
	$: filteredBoilerplates = sortedBoilerplates
		.filter(item => {
			const frameworkMatch = activeFramework === 'All' 
				? true 
				: Array.isArray(item.framework) 
					? item.framework.includes(activeFramework)
					: item.framework === activeFramework;
					
			const priceMatch = activePrices.includes(item.price);
			
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

	function handleFrameworkFilter(event: CustomEvent) {
		const { framework } = event.detail;
		activeFramework = framework;
		applyFilters();
	}

	function handlePriceFilter(event: CustomEvent) {
		const { prices } = event.detail;
		activePrices = prices;
		applyFilters();
	}

	function applyFilters() {
		filteredBoilerplates = sortedBoilerplates.filter(boilerplate => {
			const frameworkMatch = activeFramework === 'All' || 
				boilerplate.framework.includes(activeFramework);
			const priceMatch = activePrices.includes(boilerplate.price);
			return frameworkMatch && priceMatch;
		});
	}

	// Save scroll position when navigating away
	onMount(() => {
		// Prevent default scroll restoration
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		// Restore scroll position if it exists
		if ($scrollPosition > 0) {
			// Use requestAnimationFrame to ensure the scroll happens after the page is fully rendered
			requestAnimationFrame(() => {
				window.scrollTo(0, $scrollPosition);
				scrollPosition.set(0); // Reset after restoring
			});
		}

		// Save scroll position when navigating away
		return () => {
			scrollPosition.set(window.scrollY);
		};
	});
</script>

<main class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-10 lg:px-5 py-10">
		<div class="text-center py-12">
			<div class="flex justify-center mb-5">
				<a href="https://www.producthunt.com/posts/saasplates?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-saasplates" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=735284&theme=light" alt="SaasPlates - Premium&#0032;Open&#0032;Source&#0032;&#0038;&#0032;Paid&#0032;Boilerplates | Product Hunt" style="width: 200px; height: 43px;" width="250" height="54" /></a>
			</div>
			<h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
				Find & Ship your SaaS Faster.
			</h1>
			<p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				Browse a curated or handpicked library of SaaS boilerplates. From free open-source to paid ones, everything you need to go from an idea to launch is here.			</p>
		</div>

		<!-- Advertisement Rectangle -->
		<!-- <div class="pb-5 sm:pb-10">
			<Rectangle 
				url="/advertise"
				title="Promoted #1"
				description="Buy this spot for $459 for 3 months."
				imgSrc="/logos/star.svg"
			/>
		</div> -->


		<!-- Add sidebar and main content layout -->
		<div class="mt-10 mx-10">
			<!-- Main content -->
			<div class="max-w-7xl mx-auto">
				<FilterButtons 
					{activeFramework}
					activePrices={activePrices}
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
<!-- 
		<div class="mt-14">
			<LargeAdvertiseCard
				title="Footer Promotion Card"
				description="Buy this spot for $399 for 3 months."
				href="/advertise"
				image="/rectangle.webp"
			/>
		</div> -->

		<div
			class="group block bg-white mt-20 rounded-2xl border border-gray-200 transition-colors"
		>
			<div class="max-w-2xl mx-auto text-start py-16 px-4 sm:py-14">
				<SectionTwo 
				title={sectionTwoData.title}
				features={sectionTwoData.features}
			/>
				<!-- <a 
					href="/submit"
					class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 group-hover:bg-gray-800 sm:w-auto"
				>
					Submit Your Boilerplate
				</a> -->
			</div>
		<!-- </div>
		<div class="bg-white border border-gray-200 rounded-lg p-8 my-12 max-w-2xl mx-auto">
			<div class="md:flex md:items-center md:justify-between">
			  <div class="flex items-center">
				<img 
				  src="/author/arjun.webp" 
				  draggable="false"
				  alt="Arjun Aditya"
				  class="w-24 h-24 rounded-full object-cover"
				/>
				<div class="ml-6">
				  <h1 class="text-2xl font-bold text-gray-900">Arjun Aditya</h1>
				  <p class="text-lg text-gray-500">Creator</p>
				  <p class="mt-1 text-sm text-gray-500">
					  <span class="inline-block align-middle">📍</span> India
					</p>
				</div>
			  </div>
			  
			  <div class="mt-6 flex flex-wrap gap-4 md:mt-0">
				  <a 
					href="https://twitter.com/intent/follow?screen_name=arjvnz"
					class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
					target="_blank"
					rel="noopener"
				  >
					Follow on X
				  </a>
				  <a 
					href="https://arjunaditya.xyz"
					class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
					target="_blank"
					rel="noopener"
				  >
					Visit Website
				  </a>
			  </div>
			</div>
	
			<p class="mt-6 text-gray-600">Arjun</p>

		  </div> -->



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
