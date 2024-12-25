<script>
  import { goto } from '$app/navigation';
  import ShareButton from './ShareButton.svelte';
  import { trackInteraction } from '$lib/discord';
</script>

<header>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo/Brand -->
      <div class="flex items-center">
        <a 
          href="/" 
          class="text-xl font-bold text-gray-900"
          on:click={() => trackInteraction({
            page: 'header',
            element: 'logo-link',
            action: 'clicked',
            additionalInfo: 'Clicked logo to go home'
          })}
        >
          SaasPlates
        </a>
      </div>

      <!-- Navigation -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-4">
          <ShareButton compact={true} />
          <a 
            href="/advertise" 
            class="inline-flex items-center px-4 py-2 border border-slate-200 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
            on:click={() => trackInteraction({
              page: 'header',
              element: 'advertise-link',
              action: 'clicked',
              additionalInfo: 'Clicked advertise button in header'
            })}
          >
            Advertise
          </a>
        </div>
        <a 
          href="/submit" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          on:click={() => trackInteraction({
            page: 'header',
            element: 'submit-link',
            action: 'clicked',
            additionalInfo: 'Clicked submit boilerplate button in header'
          })}
        >
          Submit Boilerplate
        </a>
      </div>
    </div>
  </div>
</header> 