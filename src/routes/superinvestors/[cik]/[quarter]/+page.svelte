<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
	import { DataTable } from '@evidence-dev/core-components';
    
    export let data: PageData;
    $: ciks_entries = data.entries_cikDetails;
    // $: ciks_entries_par = data.ciks_entries;
</script>

<h1>{$page.params.cik}</h1>
<h1>{$page.params.quarter}</h1>
<!-- <div>{@html data.page_params.quarter}</div> -->

<!-- <DataTable data={ciks_entries} headerColor="red" search={true}/> -->
<br>

<ul class="p-2 flex flex-col gap-1">
    {#each ciks_entries as entry}
    <li>
            <span>{entry.cik} -- {entry.quarter} -- {entry.curr_twrr} -- {entry.value} % TWRR</span>
    {/each}
    </ul>