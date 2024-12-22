<script lang="ts">
  import Header from '$lib/components/Header.svelte';
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

<Header />

<main class="min-h-screen bg-gray-50 py-12">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Submit Your Template</h1>
      
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
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Template Title</label>
          <input type="text" name="title" id="title" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <CustomTextarea id="description" name="description" size="3" placeholder="Enter description..." />
        </div>

        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" name="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="dashboard">Dashboard</option>
            <option value="landing">Landing Page</option>
            <option value="auth">Authentication</option>
            <option value="admin">Admin Panel</option>
          </select>
        </div>

        <button 
          type="submit" 
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Template'}
        </button>
      </form>
    </div>
  </div>
</main> 