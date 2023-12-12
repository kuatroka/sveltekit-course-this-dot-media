<script lang="ts">
export let data

</script>

{#each data.ciks_details as entry}
    <p class="px-4">{entry.cik} - {entry.cum_twrr}</p>
{/each}