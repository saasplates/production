<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import FloatingSubmit from '$lib/components/FloatingSubmit.svelte';
  import '../app.css';
  import DiscordBanner from '$lib/components/DiscordBanner.svelte';
  import posthog from 'posthog-js'
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const siteName = 'SaasPlates';
  const siteTitle = 'SaasPlates - Premium SaaS Boilerplates';
  const siteDescription = 'Discover free open-source and premium SaaS boilerplates for React, Next.js, Svelte, and more. Find modern templates with authentication, payments, and UI components to ship your SaaS faster.';
  const siteUrl = 'https://saasplates.com';
  const siteKeywords = 'saas boilerplates, saas landing pages, react boilerplates, svelte boilerplates, laravel boilerplates, web development, Next.js boilerplates, admin panels';

  onMount(() => {
    if (browser) {
      posthog.init('phc_ODRW219zAhADMMyIaM8o1sITkp5g9qd5ZnJpjxsPuRu', {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only',
      });
    }
  });
</script>


<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{siteTitle}</title>
  <meta name="title" content={siteTitle} />
  <meta name="description" content={siteDescription} />
  <meta name="keywords" content={siteKeywords} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:title" content={siteTitle} />
  <meta property="og:description" content={siteDescription} />
  <meta property="og:image" content="{siteUrl}/og.png" />
  <meta property="og:site_name" content={siteName} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={siteUrl} />
  <meta property="twitter:title" content={siteTitle} />
  <meta property="twitter:description" content={siteDescription} />
  <meta property="twitter:image" content="{siteUrl}/og.png" />

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

  <!-- Preload critical images -->
  <link
    rel="preload"
    as="image"
    href="/boilerplates/Next.js-1.png"
    type="image/png"
  />
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col">
  <!-- <DiscordBanner /> -->
  <Header />
  
  <main class="flex-1">
    <slot />
  </main>

  <Footer />
  <!-- <FloatingSubmit /> -->
</div>