<script lang="ts">
    import type { PageServerData } from './$types';
    export let data:    PageServerData
    
    let entries = data?.entries_cik
    
    </script>
    
    <svelte:head>
        <title>{entries[0].cik}</title>
    </svelte:head>


    
    <!-- <h1 class="card-title">{cik.quarter}</h1> -->
    <!-- <Character {...character} /> -->

    <h1 class="card-title">Superinvestor Overview</h1>

    <ul class="flex flex-col gap-4 pl-3 justify-start items-left">
        {#each entries as {cik_name, cum_twrr, link}}
            <li>
                <a href={`${link}`} class="inline-block">
                    <div>{cik_name} -- {cum_twrr} % - {link}</div>
    
                </a>
            </li>
        {/each}
    </ul>
    
    
    
    
    
    
    
    <style>
    
    </style>