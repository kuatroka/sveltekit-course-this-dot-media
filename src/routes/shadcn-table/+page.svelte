<script lang="ts">
	import DataTable from "./data-table.svelte";
	export let data;
	$: entries_cik = data.entries_cik;
	$: num_rows = entries_cik.length;
</script>

<div class="container mx-auto py-10">
	<DataTable data={entries_cik}
	totalRowCount={num_rows} />
</div>
