<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<code>
	{JSON.stringify(data?.params, null, 2)}
</code>
{$page.params.file}

<style>
	code {
		white-space: pre-wrap;
	}
</style>