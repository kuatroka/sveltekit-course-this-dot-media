<script lang="ts">
	import '../app.pcss';
</script>

<nav class="flex justify-center px-4 space-x-4">
	<a href="/">Home</a>
	<a href="/shadcn-table">shadcn-table</a>
	<a href="/pagination-ssr-cik">pagination-ssr-cik</a>
	<!-- <a href="/search-params">Search Params</a> -->
	<a href="/forms">forms</a>
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
