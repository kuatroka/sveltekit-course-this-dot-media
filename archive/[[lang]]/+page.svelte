<script lang="ts">

	export let data
</script>

<svelte:head>
	<title>SvelteKit Training</title>
</svelte:head>

<h1>Optional Params ({data.lang})</h1>

<nav>
	<a href="/">English (/)</a>
	<a href="/fr">French (/fr)</a>
	<a href="/es">Spanish (/es)</a>
</nav>