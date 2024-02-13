<script lang="ts">
	import '../app.pcss';
	export let data;
	export let user = data.user;
</script>

<nav class="flex justify-center px-4 space-x-4">
	<a href="/">Home</a>
	<a href="/shadcn-table">shadcn-table</a>
	<a href="/pagination-ssr-cik">pagination-ssr-cik</a>
	<a href="/forms">forms</a>
	<!-- <a href="/login">login</a> -->
	{#if user}
	<a href="/profile">{user}</a>
	{:else}
	<a href="/login">login</a>
	{/if}
</nav>

<main>

	<slot />
</main>

<style>
	main {
		padding: 2rem;
		max-width: 800px;
		margin: auto;
	}
</style>
