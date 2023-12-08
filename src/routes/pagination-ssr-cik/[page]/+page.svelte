<script lang="ts">
    import type { PageData } from './$types';    
    import {page} from '$app/stores';
    export let data: PageData;

	let pageSize = 10;
	$: totalItems = 12719;
	$: totalPages = Math.ceil(totalItems / pageSize);
	$: currentPage = Number($page.params.page) - 1
</script>

<h1 class="py-4">Server Side Pagination</h1>
<h2 class="py-2 px-2">Products</h2>

{#each data.ciks as entry}
    <p class="px-4">{entry.id} - {entry.cik_name}</p>
{/each}

<br>
<div class="pagination">
    {#each Array(totalPages) as _, idx}
    <!-- <p>{idx}</p>     -->
    <a
			href="/pagination-ssr-cik/{idx +1}"
			class={currentPage === idx ? 'text-emerald-300' : ''}>
			{idx + 1}
		</a>

    {/each}
</div>

<p>Page: {currentPage + 1}</p>