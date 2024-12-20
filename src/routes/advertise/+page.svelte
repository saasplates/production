<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import { goto } from '$app/navigation';

  let loading = false;
  let error = '';
  let success = false;

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
  <title>Advertise | SaaS Templates Hub - Reach Developers Worldwide</title>
  <meta name="description" content="Promote your template or service to thousands of developers. Premium placement and sponsored opportunities available." />
  <link rel="canonical" href="https://saastemplates.dev/advertise" />
</svelte:head>

<Header />

<main class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Hero Section -->
      <div class="bg-gray-900 px-6 py-16 sm:px-12 sm:py-20 text-center">
        <h1 class="text-3xl font-bold text-white sm:text-4xl">
          Advertise with Us
        </h1>
        <p class="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Reach thousands of developers and designers looking for high-quality SaaS templates
        </p>
      </div>

      <!-- Content -->
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

        <!-- Pricing Cards -->
        <div class="grid gap-6 md:grid-cols-2 mb-12">
          <div class="border rounded-lg p-6 bg-gray-50">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Featured Template</h3>
                <p class="mt-2 text-sm text-gray-600">Premium placement at the top of template listings</p>
              </div>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Popular
              </span>
            </div>
            <p class="mt-4 text-2xl font-bold text-gray-900">$299<span class="text-base font-normal text-gray-500">/month</span></p>
            <ul class="mt-6 space-y-4 text-sm text-gray-600">
              <li class="flex items-center">
                <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Top placement in search results
              </li>
              <li class="flex items-center">
                <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Featured badge
              </li>
              <li class="flex items-center">
                <svg class="h-4 w-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Analytics dashboard
              </li>
            </ul>
          </div>

          <div class="border rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900">Sponsored Template</h3>
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

        <!-- Contact Form -->
        <form class="space-y-6" on:submit={handleSubmit}>
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              >
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
              >
            </div>
          </div>

          <div>
            <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
            <input 
              type="text" 
              name="company" 
              id="company" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            >
          </div>

          <div>
            <label for="package" class="block text-sm font-medium text-gray-700">Package</label>
            <select 
              id="package" 
              name="package" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            >
              <option value="featured">Featured Template ($299/month)</option>
              <option value="sponsored">Sponsored Template ($199/month)</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4" 
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </form>
      </div>
    </div>
  </div>
</main> 