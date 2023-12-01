<script lang="ts">
export let data

$: list_cik = data?.entries_cik_md

</script>

<svelte:head>
    <title>Superinvestors</title>
</svelte:head>


<h1 class="card-title">Superinvestors</h1>

<ul class="flex flex-col gap-4 pl-3 justify-start items-left">
    {#each list_cik as {cik, cum_mean_twrr}}
        <li>
            <a href={`/superinvestors/${cik}`} class="inline-block">
                <div>Name: {cik} ---  {cum_mean_twrr}</div>

            </a>
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

</style>