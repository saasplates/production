<script lang="ts">
  import { page } from '$app/stores';
  import { boilerplates } from '$lib/stores/boilerplates';
  
  const boilerplate = boilerplates.find(t => t.id === $page.params.id);

  // Generate structured data
  $: structuredData = boilerplate ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": boilerplate.title,
    "description": boilerplate.description,
    "image": boilerplate.image,
    "category": boilerplate.category,
    "offers": {
      "@type": "Offer",
      "price": boilerplate.pricing?.amount,
      "priceCurrency": boilerplate.pricing?.currency,
      "availability": "https://schema.org/InStock"
    },
    "dateModified": boilerplate.lastUpdated,
    "version": boilerplate.version,
    "technicalSpecification": boilerplate.techStack?.join(', ')
  } : null;
</script>

<svelte:head>
  {#if boilerplate}
    <title>{boilerplate.seoTitle || `${boilerplate.title} | SaasPlates`}</title>
    <meta name="description" content={boilerplate.seoDescription || boilerplate.description} />
    <link rel="canonical" href="https://saasplates.com/boilerplates/{boilerplate.id}" />
    
    <!-- Open Graph -->
    <meta property="og:title" content={boilerplate.seoTitle || boilerplate.title} />
    <meta property="og:description" content={boilerplate.seoDescription || boilerplate.description} />
    <meta property="og:image" content={boilerplate.image} />
    <meta property="og:type" content="product" />
    
    <!-- Product Specific -->
    {#if boilerplate.techStack}
      <meta name="keywords" content={`${boilerplate.techStack.join(', ')}, ${boilerplate.category}, boilerplate, ui kit`} />
    {/if}
    {#if boilerplate.lastUpdated}
      <meta property="product:modified_time" content={boilerplate.lastUpdated} />
    {/if}
    
    <!-- Structured Data -->
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  {/if}
</svelte:head>

{#if boilerplate}
  <main class="min-h-screen bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="lg:text-center">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {boilerplate.title}
        </h2>
        <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          {boilerplate.description}
        </p>
      </div>

      <div class="mt-10">
        <img 
          src={boilerplate.image} 
          alt={boilerplate.title}
          class="rounded-lg shadow-xl"
        />
      </div>

      <div class="mt-10">
        <h3 class="text-2xl font-bold text-gray-900">Features</h3>
        <ul class="mt-4 space-y-4">
          {#each boilerplate.features as feature}
            <li class="flex items-center">
              <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="ml-3 text-lg text-gray-700">{feature}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="mt-10 flex justify-center">
        <a
          href={boilerplate.demoUrl}
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View Live Demo
        </a>
      </div>
    </div>
  </main>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-2xl text-gray-600">Boilerplate not found</p>
  </div>
{/if} 