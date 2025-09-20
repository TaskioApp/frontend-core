/** @format */

import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User, UserManagementRequest, UserManagementResponse } from '../types'
import { API_UserManagement_Index } from '../services'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DataTableActionButtons } from '@taskio/ui-kit/src/components/DataTable/action-buttons'
import { FaEdit, FaTrash } from 'react-icons/fa'

type HookType = {
	data?: UserManagementResponse
	columns: ColumnDef<User, any>[]
	isLoading: boolean
	setFilters: Dispatch<SetStateAction<UserManagementRequest>>
}

export function useUserManagement(): HookType {
	const [filters, setFilters] = useState<UserManagementRequest>({ page: 1, per_page: 10, page_size: 20 })

	const { data, isLoading } = useQuery<UserManagementResponse>({
		queryKey: ['API_UserManagement_Index', filters],
		queryFn: () => API_UserManagement_Index(filters)
	})

	const columnHelper = createColumnHelper<User>()

	const columns: ColumnDef<User, any>[] = useMemo(
		() => [
			columnHelper.display({
				id: 'rowNumber',
				header: '#',
				cell: ({ row }) => {
					const currentPage = data?.meta?.current_page ?? 1
					const pageSize = data?.meta?.per_page ?? 15
					return (currentPage - 1) * pageSize + row.index + 1
				}
			}),
			columnHelper.accessor('email', {
				header: 'Email'
			}),
			columnHelper.accessor('first_name', {
				header: 'First Name'
			}),
			columnHelper.accessor('last_name', {
				header: 'Last Name',
				cell: info => info.getValue() ?? '-'
			}),
			columnHelper.accessor('created_at', {
				header: 'Created At',
				cell: info => new Date(info.getValue()).toLocaleString(),
				footer: info => info.column.id
			}),
			columnHelper.accessor(row => row.id, {
				id: 'actions',
				header: 'Actions',
				cell: info => (
					<DataTableActionButtons>
						<FaEdit onClick={() => console.log(info.row.original)} />
						<FaTrash />
					</DataTableActionButtons>
				)
			})
		],
		[data?.meta]
	)

	return { data, columns, isLoading, setFilters }
}
