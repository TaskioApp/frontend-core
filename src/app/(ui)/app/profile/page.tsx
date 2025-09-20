/** @format */
'use client'
import React from 'react'
import {
	Column,
	ColumnDef,
	ColumnFiltersState,
	RowData,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { FaEdit, FaTrash } from 'react-icons/fa'

// --------------------------- Mock Data ---------------------------
export type Person = {
	firstName: string
	lastName: string
	age: number
	visits: number
	status: 'single' | 'relationship' | 'complicated'
	progress: number
}

const range = (len: number) => Array.from({ length: len }, (_, i) => i)
const randomFromArray = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
const lastNames = ['Smith', 'Doe', 'Johnson', 'Brown', 'Williams', 'Jones', 'Davis']
const statuses: Person['status'][] = ['single', 'relationship', 'complicated']

export const makeData = (len: number): Person[] =>
	range(len).map(() => ({
		firstName: randomFromArray(firstNames),
		lastName: randomFromArray(lastNames),
		age: Math.floor(Math.random() * 60) + 18,
		visits: Math.floor(Math.random() * 1000),
		status: randomFromArray(statuses),
		progress: Math.floor(Math.random() * 100)
	}))

// --------------------------- Action Buttons ---------------------------
interface DataTableActionButtonsProps {
	children: React.ReactNode
}

const DataTableActionButtons = ({ children }: DataTableActionButtonsProps) => {
	return <div className='flex space-x-1'>{children}</div>
}

// --------------------------- Main App ---------------------------
function App() {
	const rerender = React.useReducer(() => ({}), {})[1]
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [data, setData] = React.useState<Person[]>(() => makeData(50))

	const columns: ColumnDef<Person, any>[] = React.useMemo(
		() => [
			{ accessorKey: 'firstName', header: 'First Name' },
			{ accessorKey: 'lastName', header: 'Last Name', cell: info => info.getValue() ?? '-' },
			{
				accessorFn: row => `${row.firstName} ${row.lastName}`,
				id: 'fullName',
				header: 'Full Name',
				cell: info => info.getValue()
			},
			{ accessorKey: 'age', header: 'Age' },
			{ accessorKey: 'visits', header: 'Visits' },
			{ accessorKey: 'status', header: 'Status' },
			{ accessorKey: 'progress', header: 'Profile Progress' },
			{
				id: 'actions',
				header: 'Actions',
				cell: info => (
					<DataTableActionButtons>
						<FaEdit className='text-blue-500 cursor-pointer' onClick={() => console.log('Edit', info.row.original)} />
						<FaTrash className='text-red-500 cursor-pointer' onClick={() => console.log('Delete', info.row.original)} />
					</DataTableActionButtons>
				)
			}
		],
		[]
	)

	const table = useReactTable({
		data,
		columns,
		state: { columnFilters },
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	})

	return (
		<div className='p-4'>
			<table className='border-collapse border border-gray-300 w-full'>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className='border p-2 text-left'>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id} className='hover:bg-gray-100'>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className='border p-2'>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className='flex items-center gap-2 mt-2'>
				<button
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
					className='border p-1 rounded'>
					{'<<'}
				</button>
				<button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className='border p-1 rounded'>
					{'<'}
				</button>
				<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className='border p-1 rounded'>
					{'>'}
				</button>
				<button
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
					className='border p-1 rounded'>
					{'>>'}
				</button>
				<span>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</span>
				<span>
					| Go to page:
					<input
						type='number'
						defaultValue={table.getState().pagination.pageIndex + 1}
						onChange={e => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0
							table.setPageIndex(page)
						}}
						className='border p-1 rounded w-16 ml-1'
					/>
				</span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => table.setPageSize(Number(e.target.value))}
					className='border p-1 rounded'>
					{[10, 20, 30, 50].map(size => (
						<option key={size} value={size}>
							Show {size}
						</option>
					))}
				</select>
			</div>

			<div className='flex gap-2 mt-2'>
				<button onClick={() => rerender()} className='border p-1 rounded'>
					Force Rerender
				</button>
				<button onClick={() => setData(makeData(50))} className='border p-1 rounded'>
					Refresh Data
				</button>
			</div>
		</div>
	)
}

export default App
