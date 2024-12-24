<script lang="ts">
  interface Feature {
    emoji: string;
    text?: string;
    href?: string;
  }

  export let title: string = "";
  export let features: Feature[] = [];
</script>

<section class="features">
  <h2>{title}</h2>
  
  <ul>
    {#each features as feature}
      <li>
        {#if feature.href}
          <a href={feature.href}>
            <span class="emoji">{feature.emoji}</span>
            {feature.text || ''}
          </a>
        {:else}
          <span class="emoji">{feature.emoji}</span>
          {feature.text || ''}
        {/if}
      </li>
    {/each}
  </ul>
</section>

<style>

  .features {
    margin: 2rem 0;
  }

  h2 {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0.75rem 0;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  .emoji {
    margin-right: 0.5rem;
    font-size: 1.2em;
  }
</style>

