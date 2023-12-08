<script lang="ts">
	import type { Cik } from "$lib/server/db/types";
	import {
		createTable,
		Subscribe,
		Render,
		createRender,
		
	} from "svelte-headless-table";
	import {
		addSortBy,
		addPagination,
		addTableFilter,
		addSelectedRows,
		addHiddenColumns,
		
	} from "svelte-headless-table/plugins";
	import { readable, writable } from "svelte/store";
	import * as Table from "$lib/components/ui/table";
	import Actions from "./data-table-actions.svelte";
	import { Button } from "$lib/components/ui/button";
	import { CaretSort, ChevronDown } from "radix-icons-svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { cn } from "$lib/utils";
	import { Input } from "$lib/components/ui/input";
	import DataTableCheckbox from "./data-table-checkbox.svelte";

	export let totalRowCount = 0;
	export let page = 0;


	export let data: Cik[] = [
		{
			cik: "2230",
			cik_name: "Success",
			quarter: "2020Q1",
			cum_twrr: 45454545, 
			value: 123,
		},
		{
			cik: "2250",
			cik_name: "down",
			quarter: "2020Q2",
			cum_twrr: 454.34, 
			value: 12334,
		},

	];

	// export let data;

	const table = createTable(readable(data), {
		sort: addSortBy({
			serverSide: true,
			toggleOrder: ['desc', 'asc']
		}),
		page: addPagination({
			// initialPageSize: 8,
			serverSide: true,
			serverItemCount: writable(totalRowCount) 
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([

		table.column({
			header: "CIK",
			accessor: "cik",
			plugins: { sort: { disable: false }, filter: { exclude: true } }
		}),
		table.column({ header: "Name", accessor: "cik_name" }),
		table.column({
			header: "Cumulative TWRR",
			accessor: "cum_twrr",
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat("en-US", {
					style: "percent"
				}).format(value);
				return formatted;
			},
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

	async function updateQuery() {
		const q = new URLSearchParams();
		q.set('order_by', $sortKeys[0].id);
		q.set('order_dir', $sortKeys[0].order);
		q.set('filter', $filterValue);
		q.set('limit', String($pageSize));
		q.set('skip', String($pageSize * $pageIndex));
	};

	const hideableCols = ["status", "email", "amount"];
</script>

<div class="w-full">
	<div class="mb-4 flex items-center gap-4">
		<Input
			class="max-w-sm"
			placeholder="Filter emails..."
			type="text"
			bind:value={$filterValue}
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
												on:click={props.sort.toggle}
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
			{Object.keys($selectedDataIds).length} of{" "}
			{$rows.length} row(s) selected.
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<div class="flex text-sm text-muted-foreground">
			{$pageIndex + 1} of {$pageCount} Pages			
		<!-- <span> {$pageIndex + 1} out of {$pageCount}</span> -->
		</div>
<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => {
				$pageIndex = $pageIndex + 1;
				updateQuery();
			}}>Next</Button
		>
	</div>
</div>
