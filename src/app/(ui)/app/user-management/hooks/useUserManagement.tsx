/** @format */

import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User, UserManagementRequest, UserManagementResponse } from '../types'
import { API_UserManagement_Index } from '../services'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { FaEdit } from 'react-icons/fa'
import { DEFAULT_PAGINATION_FILTERS } from '@/constants/search'
import { DataTable } from '@taskio/ui-kit'
import { IconButton } from '@taskio/ui-kit'
import { FaDeleteLeft } from 'react-icons/fa6'
import { __ } from '.'

type HookType = {
	data?: UserManagementResponse
	columns: ColumnDef<User>[]
	isLoading: boolean
	setFilters: Dispatch<SetStateAction<UserManagementRequest>>
}

export function useUserManagement(): HookType {
	const [filters, setFilters] = useState<UserManagementRequest>({ ...DEFAULT_PAGINATION_FILTERS })
	const { data, isLoading } = useQuery<UserManagementResponse>({
		queryKey: ['API_UserManagement_Index', filters],
		queryFn: () => API_UserManagement_Index(filters)
	})

	const columnHelper = createColumnHelper<User>()

	const columns = useMemo(
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
				header: __('email')
			}),
			columnHelper.accessor('first_name', {
				header: __('firstName')
			}),
			columnHelper.accessor('last_name', {
				header: __('lastName'),
				cell: info => info.getValue() ?? '-'
			}),
			columnHelper.accessor('created_at', {
				header: __('createdAt'),
				cell: info => new Date(info.getValue()).toLocaleString(),
				footer: info => info.column.id
			}),
			columnHelper.accessor(row => row.id, {
				id: 'actions',
				header: 'Actions',
				cell: info => (
					<DataTable.ActionButtons>
						<IconButton icon={<FaEdit />} title='edit' />
						<IconButton icon={<FaDeleteLeft />} title='delete' tooltipPlacement='bottom' />
					</DataTable.ActionButtons>
				)
			})
		],
		[columnHelper, data?.meta?.current_page, data?.meta?.per_page]
	)

	return { data, columns, isLoading, setFilters }
}
