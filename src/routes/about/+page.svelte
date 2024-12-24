<svelte:head>
	<title>About | SaasPlates</title>
	<meta name="description" content="Learn more about SaasPlates - Your trusted source for modern SaaS boilerplates and templates" />
</svelte:head>

<main class="min-h-screen bg-gray-50 py-12">
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="bg-white rounded-lg border border-gray-200 p-8 animate-fade-in hover:shadow-lg transition-all duration-300">
			<h1 class="text-3xl font-bold text-gray-900 mb-6 animate-slide-up">About SaasPlates</h1>

			<div class="prose prose-gray">
				<p class="lead text-lg animate-slide-up" style="animation-delay: 100ms;">
                    SaasPlates is a curated collection of modern, production-ready SaaS boilerplates and templates. 
                    We help developers and startups launch faster with open source and paid high-quality, customizable templates.
				</p>

				<h2 class="animate-slide-up" style="animation-delay: 200ms;">Our Mission</h2>
				<p class="animate-slide-up" style="animation-delay: 300ms;">
					We believe in accelerating SaaS development by providing access to battle-tested starting points. Our platform 
					is built on the principle of supporting both open-source and premium templates.
				</p>

				<h2 class="animate-slide-up" style="animation-delay: 400ms;">Privacy & Transparency</h2>
				<p class="animate-slide-up" style="animation-delay: 500ms;">
					We believe in being transparent about how we operate:
				</p>
				<ul class="animate-slide-up" style="animation-delay: 600ms;">
					<li class="hover:translate-x-1 transition-transform duration-300">We use Discord webhooks to track platform activity and engagement</li>
					<li class="hover:translate-x-1 transition-transform duration-300">We display targeted advertisements to support platform maintenance</li>
					<li class="hover:translate-x-1 transition-transform duration-300">We collect anonymous usage analytics to improve user experience</li>
					<li class="hover:translate-x-1 transition-transform duration-300">We do not collect or store personal information from visitors</li>
				</ul>

				<h2 class="animate-slide-up" style="animation-delay: 700ms;">Partnerships & Independence</h2>
				<p class="animate-slide-up" style="animation-delay: 800ms;">
					While we collaborate with various platforms and services, SaasPlates maintains its independence. We are not owned 
					or sponsored by <a href="https://zerops.io" target="_blank" rel="noopener noreferrer" class="text-gray-900 hover:text-gray-800 hover:underline font-medium transition-colors duration-300">Zerops</a> or any other company.
				</p>

				<div class="mt-8 flex gap-4 animate-slide-up" style="animation-delay: 900ms;">
					<a 
						href="/discord" 
						class="inline-flex no-underline items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transition-all duration-300"
					>
						Join Our Discord
					</a>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}

	.animate-slide-up {
		opacity: 0;
		animation: slide-up 0.3s ease-out forwards;
	}

	/* Optional: Add smooth scrolling to the page */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
