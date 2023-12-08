<script lang="ts">
    import type { PageData } from '../pagination-ssr-users/$types';    
    import {page} from '$app/stores';
    export let data: PageData;

	let pageSize = 8;
	$: totalItems = data.users.total;
	$: totalPages = Math.ceil(totalItems / pageSize);
	$: currentPage = (Number($page.url.searchParams.get('skip')) || 0) / pageSize;
</script>

<h1 class="py-4">Server Side Pagination</h1>
<h2 class="py-2 px-2">Users</h2>

{#each data.users.users as user}
    <p class="px-4">{user.id} - {user.email}</p>
{/each}

<br>
<div class="pagination">
    {#each Array(totalPages) as _, idx}
    <!-- <p>{idx}</p>     -->
    <a
			href="/pagination-ssr-users?limit={pageSize}&skip={pageSize * idx}"
			class={currentPage === idx ? 'text-emerald-300' : ''}>
			{idx + 1}
		</a>

    {/each}
</div>

<p>Page: {currentPage +1}</p>