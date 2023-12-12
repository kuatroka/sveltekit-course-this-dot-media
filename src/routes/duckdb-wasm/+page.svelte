<!-- <script lang="ts">
    import type { PageData } from './$types';
    import {onMount} from 'svelte';
    import { main } from '$lib/server/db/duckdb-wasm';

    onMount(async () => {
        const entries = await main();
    });
    
    export let data: PageData;
</script>

{#each  entries as entry}
    <p class="px-4">{entry.id} - {entry.cik_name}</p>
    
{/each} -->