<script lang="ts">
	import type { Cik } from "$lib/server/db/types";
	import { goto } from "$app/navigation";
	import { page } from '$app/stores'
	import debounce from 'debounce';	
	
	import {createTable, Subscribe, Render,	createRender} from "svelte-headless-table";
	import {addSortBy, addPagination,	addTableFilter,
		addSelectedRows,addHiddenColumns	} from "svelte-headless-table/plugins";
	import { readable, writable, type Writable } from "svelte/store";
	import * as Table from "$lib/components/ui/table";
	import Actions from "./data-table-actions.svelte";
	import { Button } from "$lib/components/ui/button";
	import { CaretSort, ChevronDown } from "radix-icons-svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { cn } from "$lib/utils";
	import { Input } from "$lib/components/ui/input";

	
	export let totalRowCount =  0;
	export let _pageSize = 5;
	// export let filter: string = "";
	export let order_by: string = "";
	export let order_dir: string = "";


	export let data: Cik[]; 

	const entries: Writable<Cik[]> = writable([]);
	$: $entries = data;

	const table = createTable(entries, {
		sort: addSortBy({
			serverSide: true,
			toggleOrder: ['desc', 'asc']
		}),
		page: addPagination({
			// initialPageSize: 6,
			serverSide: true,
			serverItemCount: writable(totalRowCount) ,
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
	table.column({
			header: "ID",
			accessor: "id",
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
	
		table.column({
			header: "CIK",
			accessor: "cik",
			plugins: { sort: { disable: false }, filter: { exclude: false } }
		}),
		table.column({ header: "Superinvestor", accessor: "cik_name" }),
		table.column({
			header: "Actions",
			accessor: ({ cik }) => cik,
			cell: (item) => {
				return createRender(Actions, { id: item.value });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const {
		headerRows,
		pageRows,
		tableAttrs,
		tableBodyAttrs,
		flatColumns,
		pluginStates,
		rows
	} = table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount, pageSize } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { selectedDataIds } = pluginStates.select;

	// $: serverItemCount = totalRowCount;

	// async function updateQuery() {
	// 	const q = new URLSearchParams();
	// 	q.set('order_by', $sortKeys[0].id);
	// 	q.set('order_dir', $sortKeys[0].order);
	// 	q.set('filter', $filterValue);
	// 	q.set('limit', String($pageSize));
	// 	q.set('skip', String($pageSize * $pageIndex));
	// };

	const hideableCols = ["status", "email", "amount"];

	$: filter = $filterValue;
	$: _pageIndex = $pageIndex;
	$: _sortKeys = $sortKeys;

	$pageSize = 5
	$: _pageSize = $pageSize

	$: _totalPages = Math.ceil(totalRowCount / _pageSize)
	$: _totalViewedPages = (_pageIndex + 1) * _pageSize

	$: _currentPage = $pageIndex + 1


	$: _hasNextPage = _currentPage !== _totalPages;

	$: order_by = _sortKeys[0]?.id || '';
	$: order_dir = _sortKeys[0]?.order || '';

	const handleFilterChange = debounce(() => {
    goto(`/shadcn-table?limit=${_pageSize}&skip=${_pageSize * _pageIndex}&q=${filter}&order_by=${order_by}&order_dir=${order_dir}`,
		{  replaceState: true, keepFocus: true });
  }, 200);

</script>


<div class="w-full">
	<div class="mb-4 flex items-center gap-4">
		<Input
		class="max-w-sm" 
		placeholder="Filter superinvestors..."
		type="search"
		bind:value={filter}
		on:input={handleFilterChange} 
	/>


	
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="ml-auto" builders={[builder]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hideableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem
							bind:checked={hideForId[col.id]}
						>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe
									attrs={cell.attrs()}
									let:attrs
									props={cell.props()}
									let:props
								>
									<Table.Head
										{...attrs}
										class={cn(
											"[&:has([role=checkbox])]:pl-3"
										)}
									>
										{#if props.sort.disabled}
											<Render of={cell.render()} />
										{:else}
											<Button
												variant="ghost"
												on:click={(e) => {
													props.sort.toggle(e);
													handleFilterChange();
												}}
											>
												<Render of={cell.render()} />
												<CaretSort
													class={cn(
														$sortKeys[0]?.id ===
															cell.id &&
															"text-foreground",
														"ml-2 h-4 w-4"
													)}
												/>
											</Button>
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row
							{...rowAttrs}
							data-state={$selectedDataIds[row.id] && "selected"}
						>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell
										class="[&:has([role=checkbox])]:pl-3"
										{...attrs}
									>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{_totalViewedPages} of 
			{totalRowCount} Entries
		</div>
		<Button 
			variant="outline"
			size="sm" 
			on:click={() => {$pageIndex = $pageIndex - 1;
							handleFilterChange();}}
			disabled={!$hasPreviousPage}>Previous</Button>
		<div class="flex text-sm text-muted-foreground">
			{$pageIndex + 1} of {_totalPages} Pages			
		<!-- <span> {$pageIndex + 1} out of {$pageCount}</span> -->
		</div>

		<Button
			variant="outline"
			size="sm"
			disabled={!_hasNextPage}
			on:click={() => {
				$pageIndex = $pageIndex + 1;
				handleFilterChange();
			}}>Next</Button
		>
	</div>
</div>


<!-- #TODO: Server side search and paginatin mostly work, but needs refinement. Sort is not implemented yet at all -->