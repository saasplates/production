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



<div class="min-h-screen bg-gray-50 flex flex-col">
  <!-- <DiscordBanner /> -->
  <Header />
  
  <main class="flex-1">
    <slot />
  </main>

  <Footer />
  <!-- <FloatingSubmit /> -->
</div>