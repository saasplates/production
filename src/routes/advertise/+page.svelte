<script lang="ts">
  import { Label } from 'flowbite-svelte';
  import Header from '$lib/components/Header.svelte';
  import CustomTextarea from '$lib/components/CustomTextarea.svelte';
  import { goto } from '$app/navigation';

  let loading = false;
  let error = '';
  let success = false;

  const packages = [
    { 
      name: 'Featured Boilerplate', 
      price: '$299/month', 
      value: 'featured',
      description: 'Premium placement with detailed analytics and priority support'
    },
    { 
      name: 'Sponsored Boilerplate', 
      price: '$199/month', 
      value: 'sponsored',
      description: 'Enhanced visibility with basic analytics and standard support'
    }
  ];

  let selectedPackage = '';

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    error = '';

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/advertise', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await res.json();

      if (!result.success) {
        error = result.message || 'Something went wrong';
        return;
      }

      success = true;
      setTimeout(() => goto('/'), 2000);
    } catch (e) {
      error = 'Failed to submit form';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Advertise | SaaS Boilerplates Hub - Reach Developers Worldwide</title>
  <meta name="description" content="Promote your boilerplate or service to thousands of developers. Premium placement and sponsored opportunities available." />
  <link rel="canonical" href="https://saasboilerplates.dev/advertise" />
</svelte:head>

<main class="min-h-screen bg-gray-50">
  <!-- Hero Section with lighter background -->
  <div class="bg-white border-b border-gray-200">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
        Advertise with Us
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Reach thousands of developers and designers looking for high-quality SaaS boilerplates
      </p>
    </div>
    <div class="max-w-5xl mx-auto">
      <div class="grid gap-6 md:grid-cols-2 mb-12">
        <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors relative">
          <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span class="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Featured Boilerplate</h3>
          <p class="mt-2 text-sm text-gray-600">Premium placement at the top of boilerplate listings</p>
          <p class="mt-4 text-2xl font-bold text-gray-900">$299<span class="text-base font-normal text-gray-500">/month</span></p>
          <ul class="mt-6 space-y-4 text-sm text-gray-600">
            <li class="flex items-center">
              <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Premium placement in search results
            </li>
            <li class="flex items-center">
              <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Detailed performance analytics
            </li>
            <li class="flex items-center">
              <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Priority support & consultation
            </li>
          </ul>
        </div>

        <div class="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
          <h3 class="text-lg font-semibold text-gray-900">Sponsored Boilerplate</h3>
          <p class="mt-2 text-sm text-gray-600">Strategic placement throughout the site</p>
          <p class="mt-4 text-2xl font-bold text-gray-900">$199<span class="text-base font-normal text-gray-500">/month</span></p>
          <ul class="mt-6 space-y-4 text-sm text-gray-600">
            <li class="flex items-center">
              <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Sponsored badge
            </li>
            <li class="flex items-center">
              <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Priority support
            </li>
            <li class="flex items-center">
              <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Basic analytics
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white border border-gray-200 rounded-lg">
        <div class="px-6 py-8 sm:px-12">
          {#if success}
            <div class="bg-green-50 p-4 rounded-md mb-6">
              <p class="text-green-800">Successfully submitted! We'll get back to you soon.</p>
            </div>
          {/if}
  
          {#if error}
            <div class="bg-red-50 p-4 rounded-md mb-6">
              <p class="text-red-800">{error}</p>
            </div>
          {/if}
  
          <!-- Form Section -->
          <form class="space-y-6" on:submit={handleSubmit}>
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  placeholder="Your full name"
                  aria-label="Your full name"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required
                  placeholder="your@email.com"
                  aria-label="Your email address"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
            </div>
  
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
              <input 
                type="text" 
                name="company" 
                id="company" 
                placeholder="Your company name"
                aria-label="Your company name"
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
              >
            </div>
  
            <div class="mb-6">
              <Label class="mb-4 text-gray-700">Select Package</Label>
              <div class="space-y-4">
                {#each packages as pkg}
                  <div 
                    class="relative flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors {selectedPackage === pkg.value ? 'border-gray-700 bg-gray-100 ring-1 ring-gray-900' : 'border-gray-200'}"
                    on:click={() => selectedPackage = pkg.value}
                    on:keydown={(e) => e.key === 'Enter' && (selectedPackage = pkg.value)}
                    tabindex="0"
                    role="radio"
                    aria-checked={selectedPackage === pkg.value}
                  >
                    <div class="flex items-center h-5">
                      <input
                        type="radio"
                        name="package"
                        value={pkg.value}
                        checked={selectedPackage === pkg.value}
                        class="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      >
                    </div>
                    <div class="ml-3 flex justify-between w-full">
                      <div>
                        <p class="text-base font-medium text-gray-900">{pkg.name}</p>
                        <p class="text-sm text-gray-500">{pkg.description}</p>
                      </div>
                      <p class="text-base font-medium text-gray-900">{pkg.price}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
  
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="4" 
                required
                placeholder="Tell us about your boilerplate and any specific requirements..."
                aria-label="Your message"
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
              ></textarea>
            </div>
  
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main> 