<script lang="ts">
  import { goto } from '$app/navigation';
  import CustomTextarea from '$lib/components/CustomTextarea.svelte';

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
  <title>Submit Template | SaaS Templates Hub - Share Your Work</title>
  <meta name="description" content="Share your SaaS template with our community. Get featured and reach thousands of developers looking for quality templates." />
  <link rel="canonical" href="https://saastemplates.dev/submit" />
</svelte:head>

<main class="mb-20 bg-gray-50">
  <!-- Hero Section with lighter background -->
  <div class="bg-white">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
        Submit Your Template
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Share your work with thousands of developers and designers looking for high-quality SaaS templates
      </p>
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
                <label for="title" class="block text-sm font-medium text-gray-700">Template Title</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
              </div>
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  required
                  class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
                >
                  <option value="dashboard">Dashboard</option>
                  <option value="landing">Landing Page</option>
                  <option value="auth">Authentication</option>
                  <option value="admin">Admin Panel</option>
                </select>
              </div>
            </div>
  
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                id="description" 
                name="description" 
                rows="3"
                required
                placeholder="Tell us about your template..."
                class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
              >
              </textarea>
            </div>
  
            <button 
              type="submit" 
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Template'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</main> 