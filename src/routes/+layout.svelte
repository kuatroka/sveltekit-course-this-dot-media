<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import '../app.pcss';
</script>

<nav class="flex justify-center px-4 space-x-4">
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/characters">Characters</a>
	<a href="/superinvestors">Superinvestors</a>
	<a href="/shadcn-table">shadcn-table</a>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>pagination-ssr</DropdownMenu.Trigger>
		<DropdownMenu.Content>
		  <DropdownMenu.Group>
			<a href="/pagination-ssr-users"><DropdownMenu.Item>Users</DropdownMenu.Item></a>
			<a href="/pagination-ssr-products"><DropdownMenu.Item>Products</DropdownMenu.Item></a>
			<a href="/pagination-ssr-cik"><DropdownMenu.Item>Ciks</DropdownMenu.Item></a>
			

		  </DropdownMenu.Group>
		</DropdownMenu.Content>
	  </DropdownMenu.Root>
</nav>

<slot />
