<script lang="ts">
import Button from '$lib/components/ui/button/button.svelte';
export let data;



</script>


<h1 class="text-3xl">Profile</h1>
{#if data.user}
    <p class="text-8xl text-amber-700">{data.user}</p>
{/if}


<br class="mt-6 ">
<form action="?/logout" method="post">
    <Button type="submit">Logout</Button>
</form>