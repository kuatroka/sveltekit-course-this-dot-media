<script lang="ts">
	import DataTable from "./data-table.svelte";
	export let data;
	$: totalRowCount = data.ciks[0]?.num_entries
	$: entries_cik = data.ciks;
	// const initial_num_entries = data.ciks[0]?.initial_num_entries
	// $: pageSize = 5;
	// $: totalPages = Math.ceil(totalRowCount / pageSize);
	// $: filter = "";

</script>

<div class="container mx-auto py-10">
	<DataTable data={entries_cik}
	totalRowCount={totalRowCount} 
	/>
</div>

<!-- {initial_num_entries} -->
<!-- {filter} -->
<!-- totalPages={totalPages} -->
<!-- _pageSize={pageSize} -->


