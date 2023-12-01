<script lang="ts">
import type { PageData } from './$types';
export let data: PageData

$: characters = data?.characters

</script>

<svelte:head>
    <title>Characters</title>
</svelte:head>

<h1 class="card-title">Characters</h1>

<ul class="py-2 flex flex-col gap-4">
    {#each characters as {id, name, image, occupation}}
        <li class="flex flex-row gap-4 pl-3 justify-star items-center" >
            <a href={`/characters/${id}`} class="inline-block picture">
                <img src={image} alt={name} />
            </a>
            <div>
                <a href={`/characters/${id}`} class="inline-block underline underline-offset-2">
                    <b>{name}</b>
                </a>
                    <p class="occupation">{occupation ? occupation : "Unknown"}</p>

            </div>
        </li>
    {/each}
</ul>

<!-- <h1>Quarter Cik Overview</h1>
<ul>
    {#each overview_cik_quarter as entry}
        <li>{entry.id} - {entry.quarter}</li>
    {/each}
</ul> -->







<style>
    h1 {
        color: rebeccapurple;
        font-size: xxx-large;
        font-weight: 900;
    }

    a {
        text-decoration: none;
    }

    .picture {
        display: flex;
        height: 100px;
        width: 100px;
    }
    .picture > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
    .occupation {
        color: grey;
    }

</style>