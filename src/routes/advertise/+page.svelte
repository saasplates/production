<script lang="ts">
  import { Label } from 'flowbite-svelte';
  import Header from '$lib/components/Header.svelte';
  import CustomTextarea from '$lib/components/CustomTextarea.svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let loading = false;
  let error = '';
  let success = false;
  let formData = {
    name: '',
    email: '',
    company: '',
    package: '',
    message: '',
    discord: '',
    x_username: ''
  };

  // Save form data to localStorage
  function saveFormData() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('advertiseFormData', JSON.stringify(formData));
    }
  }

  // Load form data from localStorage
  function loadFormData() {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('advertiseFormData');
      if (savedData) {
        formData = JSON.parse(savedData);
        selectedPackage = formData.package;
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
      name: 'Sponsored Boilerplate', 
      price: '$49/month', 
      value: 'featured',
      description: ' placement across all categories and sections',
      features: [
        'Top placement in all categories',
        'Visible in both free and paid sections',
        'User Interaction Analytics',
      ]
    },
    { 
      name: 'Promoted Boilerplate', 
      price: '$29/month', 
      value: 'sponsored',
      description: 'Enhanced visibility within specific categories (paid templates only)',
      features: [
        'Enhanced placement in selected category',
        'Visible in paid templates section',
        'User Interaction Analytics',
      ]
    },
    {
      name: 'Promoted #1 Platform', 
      price: '$659/ 3 months', 
      value: 'platform-hero',
      description: 'Hero section placement on landing page and all boilerplate pages',
      features: [
        'Hero section placement',
        'Visible on all pages',
        'User Interaction Analytics',
      ]
    },
    {
      name: 'Large Advertisement', 
      price: '$459/ 3 months', 
      value: 'platform-footer',
      description: 'Placement in the footer of all major pages',
      features: [
        'Footer section placement',
        'Visible on all pages',
        'Custom banner design',
        'User Interaction Analytics',
      ]
    }
  ];

  const allPackages = [
    ...packages,
    {
      name: 'Custom Package',
      price: 'Contact Us',
      value: 'custom',
      description: 'Create a custom advertising package tailored to your needs',
      features: [
        'Customized placement options',
        'Flexible duration',
        'Personalized strategy',
        'Priority support'
      ]
    }
  ];

  let selectedPackage = '';

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    error = '';

    const formDataObj = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formDataObj);

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
      // Clear localStorage after successful submission
      localStorage.removeItem('advertiseFormData');
      setTimeout(() => goto('/'), 2000);
    } catch (e) {
      error = 'Failed to submit form';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Advertise | SaasPlates - Reach Developers Worldwide</title>
  <meta name="description" content="Showcase your SaaS boilerplate or service to a global audience of developers and tech startups. Premium placement opportunities with targeted visibility and analytics tracking." />
  <link rel="canonical" href="https://saasplates.com/advertise" />
</svelte:head>

<main class="min-h-screen bg-gray-50 pt-20 sm:pt-24">
  <!-- Hero Section with lighter background -->
  <div class="bg-white pb-20 border-t border-gray-200">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 text-center">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
        Advertise with Us
      </h1>
      <p class="pt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Reach thousands of developers and designers looking for high-quality SaaS boilerplates
      </p>
    </div>
    <div class="max-w-5xl mx-auto">
      <div class="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
        {#each packages as pkg}
          <div class="border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 transition-colors relative mt-4">
            {#if pkg.value === 'featured'}
              <div class="relative  pb-3">
                <span class="bg-gray-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-20">
                  Most Popular
                </span>
              </div>
            {/if}
            <h3 class="text-lg font-semibold text-gray-900">{pkg.name}</h3>
            <p class="pt-2 text-sm text-gray-600">{pkg.description}</p>
            <p class="pt-4 text-2xl font-bold text-gray-900">{pkg.price}</p>
            <ul class="pt-4 space-y-2">
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

    <p class="text-sm text-center text-gray-600">
      If you're confused about the packages, please join our <a href="/discord" class="text-gray-900 hover:text-gray-700 font-semibold hover:underline">Discord Server</a> and we'll help you out.
    </p>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <div class="bg-white border border-gray-200 rounded-lg">
        <div class="px-4 py-6 sm:p-8 md:p-12">
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
          <form class="space-y-4 sm:space-y-6" on:submit={handleSubmit}>
            <div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  required
                  bind:value={formData.name}
                  on:input={saveFormData}
                  placeholder="Your full name"
                  aria-label="Your full name"
                  class="pt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required
                  bind:value={formData.email}
                  on:input={saveFormData}
                  placeholder="your@email.com"
                  aria-label="Your email address"
                  class="pt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
            </div>
  
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
              <input 
                type="text" 
                name="company" 
                id="company" 
                bind:value={formData.company}
                on:input={saveFormData}
                placeholder="Your company name"
                aria-label="Your company name"
                class="pt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
              >
            </div>
  
            <div class="mb-4 sm:mb-6">
              <Label class="mb-3 sm:mb-4 text-gray-700">Select Package</Label>
              <div class="space-y-3 sm:space-y-4">
                {#each allPackages as pkg}
                  <div 
                    class="relative flex flex-col sm:flex-row items-start p-3 sm:p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors {selectedPackage === pkg.value ? 'border-gray-700 bg-gray-100 ring-1 ring-gray-900' : 'border-gray-200'}"
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
                    <div class="ml-0 sm:ml-3 pt-2 sm:pt-0 flex flex-col sm:flex-row justify-between w-full gap-2">
                      <div>
                        <p class="text-sm sm:text-base font-medium text-gray-900">{pkg.name}</p>
                        <p class="text-xs sm:text-sm text-gray-500">{pkg.description}</p>
                      </div>
                      <p class="text-sm sm:text-base font-medium text-gray-900">{pkg.price}</p>
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
                bind:value={formData.message}
                on:input={saveFormData}
                placeholder="Tell us about your boilerplate and any specific requirements..."
                aria-label="Your message"
                class="pt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
              ></textarea>
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
                  aria-label="Your Discord username"
                  class="pt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="x_username" class="block text-sm font-medium text-gray-700">X (Twitter) Username</label>
                <input 
                  type="text" 
                  name="x_username" 
                  id="x_username"
                  bind:value={formData.x_username}
                  on:input={saveFormData}
                  placeholder="@username"
                  aria-label="Your X (Twitter) username"
                  class="pt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
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