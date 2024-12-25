<script lang="ts">
  import { goto } from '$app/navigation';
  import CustomTextarea from '$lib/components/CustomTextarea.svelte';
  import { Label } from 'flowbite-svelte';
  import { sendToDiscord } from '$lib/discord';
  import { onMount } from 'svelte';
  
  let loading = false;
  let error = '';
  let success = false;
  let pricingType = 'free';
  let selectedPackage = 'free';
  let isButtonDisabled = false;
  let formData = {
    name: '',
    email: '',
    title: '',
    framework: '',
    discord: '',
    x: '',
    description: '',
    link: '',
    price: '',
    package: 'free'
  };

  // Save form data to localStorage
  function saveFormData() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('submitFormData', JSON.stringify(formData));
    }
  }

  // Load form data from localStorage
  function loadFormData() {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('submitFormData');
      if (savedData) {
        formData = JSON.parse(savedData);
        selectedPackage = formData.package;
        pricingType = formData.package;
      }
    }
  }

  onMount(() => {
    loadFormData();
  });

  // Watch for form changes
  $: {
    if (selectedPackage) {
      formData.package = selectedPackage;
      saveFormData();
    }
  }

  const packages = [
    { 
      name: 'Free & Open Source', 
      price: '$0', 
      value: 'free',
      description: 'List a Free & Open Source Boilerplate.',
      features: [
        'Standard listing placement',
        'Priority support',
      ]
    },
    { 
      name: 'Paid Boilerplate Listing', 
      price: '$19', 
      value: 'paid',
      description: 'List a Paid Boilerplate.',
      features: [
        'Placement in paid section',
        'Priority support',
        'User Interaction Analytics',
        '7 days Refund',
      ]
    }
  ];

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    
    if (loading) return;
    
    loading = true;
    error = '';

    const formDataObj = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formDataObj);

    try {
      // Send to Discord webhook
      await sendToDiscord('submit', data);

      // Send to API
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
      // Clear localStorage after successful submission
      localStorage.removeItem('submitFormData');
      setTimeout(() => goto('/'), 2000);
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

    <div class="max-w-4xl mx-auto mt-4">
      <div class="grid gap-6  md:grid-cols-2 mb-12">
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
                  bind:value={formData.name}
                  on:input={saveFormData}
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
                  bind:value={formData.email}
                  on:input={saveFormData}
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
                  bind:value={formData.title}
                  on:input={saveFormData}
                  placeholder="My Awesome SaaS Boilerplate"
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="framework" class="block text-sm font-medium text-gray-700">Framework</label>
                <div class="relative">
                  <select 
                    id="framework" 
                    name="framework" 
                    required
                    bind:value={formData.framework}
                    on:change={saveFormData}
                    class="appearance-none mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2 h-[42px] text-base bg-white pr-8"
                  >
                    <option value="" disabled selected>Select a framework</option>
                    <option value="nextjs">Next.js</option>
                    <option value="laravel">Laravel</option>
                    <option value="sveltekit">SvelteKit</option>
                    <option value="remix">Remix</option>
                    <option value="nuxt">Nuxt</option>
                    <option value="django">Django</option>
                    <option value="rails">Ruby on Rails</option>
                    <option value="express">Express.js</option>
                    <option value="flask">Flask</option>
                    <option value="other">Other</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <Label class="mb-4 text-gray-700">Select Package Type</Label>
              <div class="flex flex-col gap-4">
                {#each packages as pkg}
                  <div 
                    class="w-full relative flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors {selectedPackage === pkg.value ? 'border-gray-700 bg-gray-100 ring-1 ring-gray-900' : 'border-gray-200'}"
                    on:click={() => {
                      selectedPackage = pkg.value;
                      pricingType = pkg.value;
                    }}
                    on:keydown={(e) => e.key === 'Enter' && (selectedPackage = pkg.value) && (pricingType = pkg.value)}
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
                      <p class="text-base font-medium text-gray-900 ml-8">{pkg.price}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <div>
                <label for="discord" class="block text-sm font-medium text-gray-700">Discord Username</label>
                <input 
                  type="text" 
                  name="discord" 
                  id="discord" 
                  bind:value={formData.discord}
                  on:input={saveFormData}
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
                  bind:value={formData.x}
                  on:input={saveFormData}
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
                bind:value={formData.description}
                on:input={saveFormData}
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
                bind:value={formData.link}
                on:input={saveFormData}
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
                  bind:value={formData.price}
                  on:input={saveFormData}
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
              disabled={loading || isButtonDisabled}
            >
              {loading ? 'Submitting...' : 'Submit Boilerplate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main> 