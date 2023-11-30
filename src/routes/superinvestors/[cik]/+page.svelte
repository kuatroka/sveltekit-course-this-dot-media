<script lang="ts">
    import type { PageServerData } from './$types';
    export let data:    PageServerData
    
    let entries = data?.entries_cik_details
    
    </script>
    
    <svelte:head>
        <title>{entries[0].cik}</title>
    </svelte:head>

    
    <div class="flex gap-8">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/superinvestors">Superinvestors</a>
        <a href="/characters">Characters</a>
    </div>
    
    <!-- <h1 class="card-title">{cik.quarter}</h1> -->
    <!-- <Character {...character} /> -->

    <h1 class="card-title">Superinvestor Overview</h1>

    <ul>
        {#each entries as entry}
            <li>{entry.cik} - {entry.quarter}</li>
        {/each}
    </ul>
    
    
    
    
    
    
    
    <style>
    
    </style>