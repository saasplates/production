<script lang="ts">
	export let data;
	const { boilerplate } = data;
	import { scrollPosition } from '$lib/stores/scroll';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import LargeAdvertiseCard from '$lib/components/LargeAdvertiseCard.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import FloatingSubmit from '$lib/components/FloatingSubmit.svelte';
	import { goto } from '$app/navigation';

	let imageLoaded = false;
	let imgElement: HTMLImageElement;

	const siteUrl = 'https://saasplates.com';
	const siteName = 'SaasPlates';

	// Enhanced SEO data
	$: seoTitle = boilerplate
		? `${boilerplate.title} - ${boilerplate.framework.join(', ')} SaaS Boilerplate | ${siteName}`
		: siteName;
	$: seoDescription = boilerplate
		? `${boilerplate.description} Built with ${boilerplate.framework.join(', ')}. ${boilerplate.price === 'Free' ? 'Free' : 'Premium'} SaaS boilerplate with modern features and best practices.`
		: 'Discover SaaS boilerplates and templates';
	$: seoKeywords = boilerplate
		? `${boilerplate.framework.join(', ')}, saas boilerplate, ${boilerplate.title.toLowerCase()}, ${boilerplate.price.toLowerCase()} saas template, ${boilerplate.framework.map((f) => f.toLowerCase() + ' template').join(', ')}`
		: 'saas boilerplates';
	$: seoImage = boilerplate
		? `${siteUrl}${boilerplate.mainImage || boilerplate.image}`
		: `${siteUrl}/og.png`;
	$: seoUrl = boilerplate ? `${siteUrl}/boilerplates/${boilerplate.id}` : siteUrl;

	onMount(() => {
		// Prevent default scroll restoration
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		// Reset image loaded state on mount
		imageLoaded = false;

		// If the image is already cached, it might not trigger onload
		if (imgElement?.complete) {
			imageLoaded = true;
		}
	});

	function handleBackClick() {
		try {
			// Save current scroll position before navigating
			scrollPosition.set(window.scrollY);

			const currentLength = window.history.length;
			history.back();

			// Check after a small delay if we actually navigated back
			setTimeout(() => {
				if (window.history.length === currentLength) {
					// If we're still on the same page, use the fallback
					goto('/');
				}
			}, 100);
		} catch (e) {
			// Fallback if history.back() fails
			goto('/');
		}
	}

	function onImageLoad() {
		imageLoaded = true;
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{seoTitle}</title>
	<meta name="title" content={seoTitle} />
	<meta name="description" content={seoDescription} />
	<meta name="keywords" content={seoKeywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content={seoUrl} />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="og:image" content={seoImage} />
	<meta property="og:site_name" content={siteName} />
	<meta property="article:publisher" content={siteUrl} />
	{#if boilerplate?.publishedAt}
		<meta property="article:published_time" content={boilerplate.publishedAt} />
	{/if}
	{#if boilerplate?.updatedAt}
		<meta property="article:modified_time" content={boilerplate.updatedAt} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:domain" content="saasplates.com" />
	<meta name="twitter:url" content={seoUrl} />
	<meta name="twitter:title" content={seoTitle} />
	<meta name="twitter:description" content={seoDescription} />
	<meta name="twitter:image" content={seoImage} />
	<meta
		name="twitter:image:alt"
		content={boilerplate
			? `${boilerplate.title} - ${boilerplate.framework.join(', ')} SaaS Boilerplate Screenshot`
			: 'SaasPlates'}
	/>

	<!-- Additional SEO -->
	<link rel="canonical" href={seoUrl} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<meta name="author" content={siteName} />
	<meta name="language" content="English" />

	{#if boilerplate}
		<!-- Enhanced Structured Data -->
		<script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": boilerplate.title,
        "description": boilerplate.description,
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": boilerplate.price === "Free" ? "0" : boilerplate.priceAmount || "Contact for Price",
          "priceCurrency": boilerplate.price === "Free" ? "USD" : undefined,
          "availability": "https://schema.org/InStock"
        },
        "image": seoImage,
        "url": seoUrl,
        "author": {
          "@type": "Organization",
          "name": siteName,
          "url": siteUrl
        },
        "keywords": [...boilerplate.framework, "saas boilerplate", boilerplate.title.toLowerCase()].join(", "),
        "softwareVersion": boilerplate.version || "1.0.0",
        "datePublished": boilerplate.publishedAt || new Date().toISOString(),
        "dateModified": boilerplate.updatedAt || new Date().toISOString(),
        "programmingLanguage": boilerplate.framework.join(", "),
        "requirements": "Modern web browser",
        "applicationSubCategory": "SaaS Development",
        "aggregateRating": boilerplate.rating ? {
          "@type": "AggregateRating",
          "ratingValue": boilerplate.rating.value,
          "ratingCount": boilerplate.rating.count,
          "bestRating": "5",
          "worstRating": "1"
        } : undefined
      })}
		</script>

		<!-- BreadcrumbList Structured Data -->
		<script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Boilerplates",
            "item": `${siteUrl}/boilerplates`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": boilerplate.title,
            "item": seoUrl
          }
        ]
      })}
		</script>
	{/if}
</svelte:head>

{#if boilerplate}
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-20 sm:pt-24">
		<!-- Back and Share Button - Always visible -->
		<div class="flex items-center justify-between mb-4 sm:mb-6">
			<a
				href="#"
				on:click|preventDefault={handleBackClick}
				class="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
			>
				<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back to Homepage
			</a>
			<ShareButton title={boilerplate.title} />
		</div>

		<!-- Main Content Area -->
		<div class="flex flex-col lg:flex-row-reverse gap-6 lg:gap-8">
			<!-- Main Content First on Mobile -->
			<div class="flex-1 space-y-6">
				<div class="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
					{#if !imageLoaded}
						<div class="absolute inset-0 animate-pulse bg-gray-100" />
					{/if}
					<img
						bind:this={imgElement}
						src={boilerplate.mainImage}
						alt={boilerplate.title}
						draggable="false"
						on:load={onImageLoad}
						class="w-full h-full object-cover rounded-lg border border-slate-200 transition-opacity duration-300"
						class:opacity-0={!imageLoaded}
						class:opacity-100={imageLoaded}
					/>
				</div>

				<!-- Title on Mobile -->
				<div class="lg:hidden">
					<h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
						{boilerplate.title}
					</h1>
				</div>

				<!-- Description -->
				<div class="prose max-w-none">
					<h2 class="text-xl font-semibold mb-4">Description</h2>
					<p class="text-gray-600">
						{boilerplate.description}
					</p>
				</div>

				<!-- Children Section -->
				{#if boilerplate.children}
					<div class="space-y-4">
						<h2 class="text-xl font-semibold">Additional Information</h2>
						<div class="grid grid-cols-1 gap-4">
							{#each boilerplate.children as child}
								<div class="p-6 rounded-lg border border-gray-200 bg-white">
									{#if child.icon}
										<div class="flex items-center gap-3 mb-3">
											<span class="text-gray-700">
												<svelte:component this={child.icon} />
											</span>
											<h3 class="text-lg font-medium text-gray-900">{child.title}</h3>
										</div>
									{:else}
										<h3 class="text-lg font-medium text-gray-900 mb-3">{child.title}</h3>
									{/if}
									<div class="text-gray-600">
										{@html child.content}
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Features Section -->
				{#if boilerplate.features}
					<div class="space-y-4">
						<h2 class="text-xl font-semibold">Features</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each boilerplate.features as feature}
								<div class="p-4 rounded-lg border border-gray-200 bg-white">
									<h3 class="font-medium text-gray-900">{feature.title}</h3>
									<p class="text-sm text-gray-600">{feature.description}</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Custom Content Cards -->
				{#if boilerplate.customContent}
					<div class="space-y-4">
						{#each boilerplate.customContent as content}
							<div class="p-6 rounded-lg border border-gray-200 bg-white">
								<h3 class="text-lg font-medium text-gray-900 mb-2">{content.title}</h3>
								<p class="text-gray-600">{content.description}</p>
								{#if content.links}
									<div class="mt-4 flex flex-wrap gap-4">
										{#each content.links as link}
											<a
												href={link.url}
												class="text-gray-900 hover:text-gray-700 font-medium inline-flex items-center group"
												target="_blank"
												rel="noopener noreferrer"
											>
												{link.text}
												<svg
													class="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M7 11l5-5m0 0l5 5m-5-5v12"
														transform="rotate(45, 12, 12)"
													/>
												</svg>
											</a>
										{/each}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Sidebar - After main content on mobile -->
			<div class="w-full lg:w-80 lg:flex-shrink-0">
				<div class="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
					<!-- Title - Only visible on desktop -->
					<h1 class="hidden lg:block text-xl sm:text-2xl font-bold text-gray-900 mb-6">
						{boilerplate.title}
					</h1>

					<div class="space-y-6">
						<!-- Technologies -->
						<div class="space-y-2">
							<h2 class="font-semibold text-gray-700">Tech Stack</h2>
							<div class="flex flex-wrap gap-2">
								{#each boilerplate.framework as tech}
									<span class="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800">
										{tech}
									</span>
								{/each}
							</div>
						</div>

						<!-- Price -->
						<div class="space-y-2">
							<h2 class="font-semibold text-gray-700">Price</h2>
							<span
								class="px-3 py-1 rounded-md text-sm inline-block {boilerplate.price === 'Free'
									? 'bg-green-100 text-green-800'
									: 'bg-blue-100 text-blue-800'}"
							>
								{#if boilerplate.priceAmount}
									{boilerplate.priceAmount}
								{:else}
									{boilerplate.price}
								{/if}
							</span>
						</div>

						<!-- Links -->
						<div class="grid grid-cols-2 gap-2">
							{#if boilerplate.demoUrl}
								<a
									href={boilerplate.demoUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
								>
									Preview
								</a>
							{/if}

							{#if boilerplate.sourceCodeUrl}
								<a
									href={boilerplate.sourceCodeUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
								>
									Source Code
								</a>
							{/if}

							{#if boilerplate.visitUrl}
								<a
									href={boilerplate.visitUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="col-span-2 inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
								>
									Visit
								</a>
							{/if}

							<!-- Add custom button -->
							{#if boilerplate.customButton}
								<a
									href={boilerplate.customButton.url}
									target="_blank"
									rel="noopener noreferrer"
									class="col-span-2 inline-flex items-center justify-center px-4 w-full mt-3 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50 group"
								>
									{boilerplate.customButton.text}
									<!-- <svg
										class="w-4 h-4 ml-0.5 -mr-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M7 11l5-5m0 0l5 5m-5-5v12"
											transform="rotate(45, 12, 12)"
										/>
									</svg> -->
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
{:else}
	<div class="min-h-screen flex items-center justify-center">
		<p class="text-2xl text-gray-600">Boilerplate not found</p>
	</div>
{/if}
