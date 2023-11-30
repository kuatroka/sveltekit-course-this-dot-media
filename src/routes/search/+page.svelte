<script lang="ts">
    import { page } from '$app/stores'
    import type { PageData } from './$types';
    export let data: PageData
  
    function submitoninput(input: HTMLInputElement) {
      const form = input.closest('form')!
      input.oninput = (e) =>  form.requestSubmit()
    }
  </script>
  
<form action="/search" data-sveltekit-replacestate data-sveltekit-keepfocus>
    <label>
        Search
        <input type="search" name="q" use:submitoninput value={$page.url.searchParams.get('q')}>
    </label>
</form>
  
<ul>
{#each data.items as entry}
<li>
    <a href={`/superinvestors/${entry.cik}`} class="inline-block">
        <span>{entry.cik_name} -- {entry.cum_mean_twrr} % TWRR</span>
    </a>
{/each}
</ul>