<script lang="ts">
  import { goto } from '$app/navigation';
  import CustomTextarea from '$lib/components/CustomTextarea.svelte';

  let loading = false;
  let error = '';
  let success = false;
  let pricingType = 'free';

  const packages = [
    { 
      name: 'Free & Open Source', 
      price: '$0', 
      value: 'free',
      description: 'List your open source boilerplate with our community',
      features: [
        'Standard listing placement',
        'Community support',
        'Basic analytics',
      ]
    },
    { 
      name: 'Premium Listing', 
      price: '$19/month', 
      value: 'paid',
      description: 'List your premium boilerplate with enhanced visibility',
      features: [
        'Premium placement in paid section',
        'Priority support',
        'Detailed analytics',
      ]
    }
  ];

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    error = '';

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/submit', {
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
      setTimeout(() => goto('/'), 2000); // Redirect after showing success message
    } catch (e) {
      error = 'Failed to submit form';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Submit Boilerplate | SaaS Boilerplates Hub - Share Your Work</title>
  <meta name="description" content="Share your SaaS boilerplate with our community. Get featured and reach thousands of developers looking for quality boilerplates." />
  <link rel="canonical" href="https://saasboilerplates.dev/submit" />
</svelte:head>

<main class="mb-20 bg-gray-50">

  <!-- Hero Section with lighter background -->
  <div class="bg-white">

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
        Submit Your Boilerplate
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Share your work with thousands of developers and designers looking for high-quality SaaS boilerplates
      </p>
    </div>

    <div class="max-w-5xl mx-auto mt-4">
      <div class="grid gap-6 md:grid-cols-2 mb-12">
        {#each packages as pkg}
          <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors relative">
            {#if pkg.value === 'paid'}
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            {/if}
            <h3 class="text-lg font-semibold text-gray-900">{pkg.name}</h3>
            <p class="mt-2 text-sm text-gray-600">{pkg.description}</p>
            <p class="mt-4 text-2xl font-bold text-gray-900">{pkg.price}</p>
            <ul class="mt-4 space-y-2">
              {#each pkg.features as feature}
                <li class="flex items-start">
                  <svg class="h-5 w-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm text-gray-600">{feature}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white border border-gray-200 rounded-lg">
        <div class="px-6 py-8 sm:px-12">
          {#if success}
            <div class="bg-green-50 p-4 rounded-md mb-6">
              <p class="text-green-800">Successfully submitted! Redirecting...</p>
            </div>
          {/if}
  
          {#if error}
            <div class="bg-red-50 p-4 rounded-md mb-6">
              <p class="text-red-800">{error}</p>
            </div>
          {/if}
  
          <form class="space-y-6" on:submit={handleSubmit}>
            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  placeholder="Arjun Aditya"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required
                  placeholder="meow@nermalcat69.dev"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Boilerplate Title</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  required
                  placeholder="My Awesome SaaS Boilerplate"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="framework" class="block text-sm font-medium text-gray-700">Framework</label>
                <select 
                  id="framework" 
                  name="framework" 
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
                  <option value="nextjs">Next.js</option>
                  <option value="laravel">Laravel</option>
                  <option value="sveltekit">SvelteKit</option>
                  <option value="remix">Remix</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label for="type" class="block text-sm font-medium text-gray-700">Pricing Type</label>
                <select 
                  id="type" 
                  name="type" 
                  required
                  bind:value={pricingType}
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label for="discord" class="block text-sm font-medium text-gray-700">Discord Username</label>
                <input 
                  type="text" 
                  name="discord" 
                  id="discord" 
                  placeholder="username"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                />
              </div>

              <div>
                <label for="x" class="block text-sm font-medium text-gray-700">X Username</label>
                <input 
                  type="text" 
                  name="x" 
                  id="x" 
                  placeholder="@username"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                />
              </div>
            </div>
  
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                id="description" 
                name="description" 
                rows="3"
                required
                placeholder="Tell us about your boilerplate..."
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
              ></textarea>
            </div>

            <div>
              <label for="link" class="block text-sm font-medium text-gray-700">Link to Boilerplate</label>
              <input 
                type="url"
                id="link" 
                name="link" 
                required
                placeholder="https://github.com/username/repo"
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
              />
            </div>
  
            {#if pricingType === 'paid'}
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700">Price (USD)</label>
                <input 
                  type="number" 
                  name="price" 
                  id="price" 
                  required
                  min="0"
                  step="0.01"
                  placeholder="29.99"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                />
              </div>
            {/if}
  
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Boilerplate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main> 