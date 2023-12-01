<script lang="ts">
    import { navigating } from '$app/stores'
    import { page } from '$app/stores'
    import type { PageData } from './$types';
    export let data: PageData
  
    function submitoninput(input: HTMLInputElement) {
      const form = input.closest('form')!
      input.oninput = (e) =>  form.requestSubmit()
    }
  </script>

<h1>Search</h1>
<form action="/search" class="p-2">
    <label>
        
        <input type="search" name="q" use:submitoninput value={$page.url.searchParams.get('q')}>
    </label>
</form>
  
<ul class="p-2 flex flex-col gap-1">
{#each data.items as entry}
<li>
    <a href={`/superinvestors/${entry.cik}`} class="inline-block">
        <span>{entry.cik_name} -- {entry.cum_mean_twrr} % TWRR</span>
    </a>
{/each}
</ul>