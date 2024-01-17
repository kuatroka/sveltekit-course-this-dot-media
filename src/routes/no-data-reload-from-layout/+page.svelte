<script lang="ts">
export let data

</script>

<h1>Using data load in `+layout.server.ts`</h1>
<p class="ml-5" >If I use layout.server.ts in the root or any directory and do not 
    change url in any way by using `url.searchParams` or 'params', then
the data that was once loaded to to website, stays there in cache and doen't 
get reloaded when navigating between pages or back and forth </p>

<div class="mt-5">

    {#each data.ciks_details as entry}
    <p class="ml-5">{entry.cik} - {entry.cum_twrr}</p>
    {/each}
</div>