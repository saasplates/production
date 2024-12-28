<script lang="ts">
	import { boilerplates } from '$lib/stores/boilerplates';
	import { starters } from '$lib/stores/starters';
	import { scrollPosition } from '$lib/stores/scroll';
	import TemplateCard from '$lib/components/TemplateCard.svelte';
	import StarterCard from '$lib/components/StarterCard.svelte';
	import ADDCard from '$lib/components/ADDCard.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import { onMount } from 'svelte';
	import { getRandomAd } from '$lib/stores/ads';
	import SectionTwo from '$lib/components/SectionTwo.svelte';
	import LargeAdvertiseCard from '$lib/components/LargeAdvertiseCard.svelte';
	import FilterButtons from '$lib/components/FilterButtons.svelte';
	import type { Boilerplate } from '$lib/stores/boilerplates';
	import type { Starter } from '$lib/stores/starters';


	const siteName = 'SaasPlates';
  const siteTitle = 'SaasPlates - Premium SaaS Boilerplates';
  const siteDescription = 'Discover free open-source and premium SaaS boilerplates for React, Next.js, Svelte, and more. Find modern templates with authentication, payments, and UI components to ship your SaaS faster.';
  const siteUrl = 'https://saasplates.com';
  const siteKeywords = 'saas boilerplates, saas landing pages, react boilerplates, svelte boilerplates, laravel boilerplates, web development, Next.js boilerplates, admin panels';

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

	// Show ADDCard after first 4 items
	const ADD_POSITION = 4;

	// Random position for advertisement (between 1 and 5)
	const adPosition = Math.floor(Math.random() * 5) + 1;

	// Pagination
	const ITEMS_PER_PAGE = 12;
	let currentPage = 1;
	let loading = false;

	// Define proper types
	interface CardItem {
		type: 'boilerplate' | 'starter' | 'add' | 'advertise';
		content?: Boilerplate | Starter;
	}

	// View state
	let activeView: 'boilerplates' | 'starters' = 'boilerplates';
	let activeFramework = 'All';
	let activePrices = ['Free', 'Paid'];

	// Initial sorting and filtering for boilerplates
	$: sortedBoilerplates = [...boilerplates].sort((a, b) => {
		if (a.featured && !b.featured) return -1;
		if (!a.featured && b.featured) return 1;
		if (a.sponsored && !b.sponsored) return -1;
		if (!a.sponsored && b.sponsored) return 1;
		return 0;
	});

	// Framework options are manually defined, not from boilerplates
	const Frameworks = [
		'All',
		'Next.js',
		'Remix',
		'Angular',
		'Nuxt',
		'SvelteKit',
		'Laravel'
	];

	// Filter logic based on active view
	$: filteredItems = activeView === 'boilerplates'
		? sortedBoilerplates.filter(item => {
				const frameworkMatch = activeFramework === 'All' 
					? true 
					: Array.isArray(item.framework) 
						? item.framework.includes(activeFramework)
						: item.framework === activeFramework;
						
				const priceMatch = activePrices.includes(item.price);
				
				return frameworkMatch && priceMatch;
			})
		: starters.filter(item => {
				return activeFramework === 'all' || item.framework.includes(activeFramework);
			});

	// Add ADDCard to the filtered items
	$: paginatedItemsWithCards = filteredItems.length > 0
		? [...Array(Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length))]
			.map((_, index) => {
				const item = filteredItems[index];
				if (!item) return null;
				return {
					type: activeView === 'boilerplates' ? 'boilerplate' : 'starter',
					content: item
				} as CardItem;
			})
			.filter((item): item is CardItem => item !== null)
			.concat({ type: 'add' } as CardItem)
		: [{ type: 'add' } as CardItem];

	$: hasMore = filteredItems.length > currentPage * ITEMS_PER_PAGE;

	function loadMore() {
		if (loading || !hasMore) return;
		loading = true;
		currentPage++;
		setTimeout(() => {
			loading = false;
		}, 500);
	}

	function handleViewChange(event: CustomEvent) {
		const { view } = event.detail;
		activeView = view;
		activeFramework = view === 'boilerplates' ? 'All' : 'all';
		currentPage = 1;
	}

	function handleFrameworkFilter(event: CustomEvent) {
		const { framework } = event.detail;
		activeFramework = framework;
		currentPage = 1;
	}

	function handlePriceFilter(event: CustomEvent) {
		const { prices } = event.detail;
		activePrices = prices;
		currentPage = 1;
	}

	// Intersection Observer for infinite scroll
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting && hasMore && !loading) {
						loadMore();
					}
				});
			},
			{ rootMargin: '100px' }
		);
	});

	// Add type-safe getters for content
	$: getBoilerplateContent = (item: CardItem): Boilerplate | undefined => {
		if (item.type === 'boilerplate' && item.content && 'framework' in item.content) {
			return item.content as Boilerplate;
		}
		return undefined;
	};

	$: getStarterContent = (item: CardItem): Starter | undefined => {
		if (item.type === 'starter' && item.content && 'category' in item.content) {
			return item.content as Starter;
		}
		return undefined;
	};
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{siteTitle}</title>
  <meta name="title" content={siteTitle} />
  <meta name="description" content={siteDescription} />
  <meta name="keywords" content={siteKeywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://saasplates.com" />
  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={siteDescription} />
  <meta property="og:image" content="https://saasplates.com/og.png" />
  <meta property="og:site_name" content={siteName} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content="saasplates.com" />
  <meta name="twitter:url" content="https://saasplates.com" />
  <meta name="twitter:creator" content="@nermalcat69" />
  <meta name="twitter:site" content="@nermalcat69" />
  <meta name="twitter:title" content={siteTitle} />
  <meta name="twitter:description" content={siteDescription} />
  <meta name="twitter:image" content="https://saasplates.com/og.png" />
  <meta name="twitter:image:alt" content="SaasPlates - Premium SaaS Boilerplates" />

  <!-- Additional SEO -->
  <link rel="canonical" href={siteUrl} />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#18181B" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl,
      "description": siteDescription,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    })}
  </script>
</svelte:head>


<main class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-10 lg:px-5 py-20">
		<div class="text-center py-12">
			<div class="flex justify-center mb-5">
				<a target="_blank" href="https://www.producthunt.com/posts/saasplates?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-saasplates"><img draggable="false" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=735284&theme=light" alt="SaasPlates - Premium&#0032;Open&#0032;Source&#0032;&#0038;&#0032;Paid&#0032;Boilerplates | Product Hunt" style="width: 200px; height: 43px;" width="250" height="54" /></a>
			</div>
			<h1 class="text-4xl font-bold text-gray-900 sm:text-6xl">
				Find & Ship your SaaS Faster.
			</h1>
			<p class="pt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				Browse a curated library of SaaS boilerplates and micro-starters. From complete solutions to specific functionality starters, everything you need is here.
			</p>
		</div>

		<!-- Add sidebar and main content layout -->
		<div class="mt-10 mx-3 sm:mx-10">
			<!-- Main content -->
			<div class="max-w-7xl mx-auto">
				<FilterButtons 
					{activeView}
					{activeFramework}
					{activePrices}
					{Frameworks}
					on:viewChange={handleViewChange}
					on:filterFramework={handleFrameworkFilter}
					on:filterPrice={handlePriceFilter}
				/>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
					{#each paginatedItemsWithCards as item}
						{#if item.type === 'boilerplate'}
							{@const boilerplate = getBoilerplateContent(item)}
							{#if boilerplate !== undefined}
								<TemplateCard {boilerplate} />
							{/if}
						{:else if item.type === 'starter'}
							{@const starter = getStarterContent(item)}
							{#if starter !== undefined}
								<StarterCard {starter} />
							{/if}
						{:else if item.type === 'add'}
							<ADDCard />
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
								Show More {activeView === 'boilerplates' ? 'Boilerplates' : 'Starters'}
							{/if}
						</button>
					</div>
				{/if}
			</div>
		</div>
		<br />
		<br />
		<br />
<!-- 
		<div
			class="group max-w-4xl mx-auto block bg-white mt-20 rounded-2xl border border-gray-200 transition-colors"
		>
			<div class="max-w-2xl mx-auto text-start py-16 px-4 sm:py-14">
				<SectionTwo 
					title={sectionTwoData.title}
					features={sectionTwoData.features}
				/>
			</div>
		</div> -->
	</div>
</main>
