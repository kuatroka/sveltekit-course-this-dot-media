<script lang="ts">
    import Character from '$lib/components/Character.svelte';
    import type { PageData } from './$types';
    export let data: PageData
    
    $: character = data?.character
    
    </script>
    
    <svelte:head>
        <title>{character.name}</title>
    </svelte:head>
    
    <h1 class="card-title">{character.name}</h1>
    <Character {...character} />

    
    <!-- <h1>Quarter Cik Overview</h1>
    <ul>
        {#each overview_cik_quarter as entry}
            <li>{entry.id} - {entry.quarter}</li>
        {/each}
    </ul> -->
    
    
    
    
    
    
    
    <style>
    
    </style>