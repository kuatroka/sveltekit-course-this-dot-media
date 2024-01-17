<script>
	import '../app.pcss';
	import { MainNav } from "$lib/components/main-nav";
	import { Search } from "$lib/components/main-nav";
	import { UserNav } from "$lib/components/main-nav";
	import ThemeToggle from '$lib/components/main-nav/theme-toggle.svelte';
</script>

<!-- <ModeWatcher /> -->

<div class="relative flex min-h-screen flex-col" id="page">
	<div class="border-b">
		<div class="flex h-16 items-center px-4">
			<MainNav class="mx-6" />
			<div class="ml-auto flex items-center space-x-4">
				<Search />
				<UserNav />
				<ThemeToggle />
			</div>
		</div>
	</div>
	<div class="flex-1">
		<slot />
	</div>
</div>


















<!-- <script lang="ts">
	import '../app.pcss';
</script> -->

<!-- <nav class="flex justify-center px-4 space-x-4">
	<a href="/">Home</a>
	<a href="/shadcn-table">shadcn-table</a>
	<a href="/pagination-ssr-cik">pagination-ssr-cik</a>
	<a href="/forms">forms</a>
</nav> -->

<!-- <main>

	<slot />
</main> -->

<!-- <style>
	main {
		padding: 2rem;
		max-width: 800px;
		margin: auto;
	}
</style> -->


<!-- <style lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style> -->
