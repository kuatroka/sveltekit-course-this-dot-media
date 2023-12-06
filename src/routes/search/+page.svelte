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
<form action="/search" data-sveltekit-replacestate data-sveltekit-keepfocus
>
    <label class="p-2 box-border border-2 border-sky-500">
        
        <input type="search" name="q" use:submitoninput value={$page.url.searchParams.get('q')}>
    </label>
</form>
  
<ul class="p-2 flex flex-col gap-1">
{#each data.items as entry}
<li>
    <a href={entry.link} class="inline-block">
        <span>{entry.cik_name} -- {entry.cum_mean_twrr} % TWRR</span>
    </a>
{/each}
</ul>