<script lang="ts">
	import { onMount } from "svelte";
	import DataTable from "./data-table.svelte";
	export let data;
	$: entries_cik = data.ciks;
	$: totalItems = 12917;
	$: pageSize = 5;
	$: totalPages = Math.ceil(totalItems / pageSize);
	$: filter = "";

</script>

<div class="container mx-auto py-10">
	<DataTable data={entries_cik}
	totalRowCount={totalItems} 
	pageSize={pageSize}
	totalPages={totalPages}
	{filter}/>
</div>



