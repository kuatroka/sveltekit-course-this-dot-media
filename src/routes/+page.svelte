<script lang="ts">
	let subjects = 'SvelteKit Trainees';
	export let data;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Hello {data.user?.name ?? subjects}!</h1>
	


<style>
	h1 {
		color: rebeccapurple;
	}
</style>
