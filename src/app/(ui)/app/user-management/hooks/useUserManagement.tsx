/** @format */

import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User, UserManagementRequest, UserManagementResponse } from '../types'
import { API_UserManagement_Index } from '../services'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { DEFAULT_PAGINATION_FILTERS } from '@/constants/search'
import { DataTable } from '@taskio/ui-kit'
import { __ } from '.'
import { ActionColumn, RowColumn } from '@taskio/ui-kit'

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
			RowColumn({ columnHelper, data }),
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
				cell: info => new Date(info.getValue()).toLocaleString()
			}),
			ActionColumn({
				columnHelper,
				cell: row => (
					<>
						<DataTable.Edit onClick={() => alert(row.id)} />
						<DataTable.Delete />
						<DataTable.View />
					</>
				)
			})
		],
		[columnHelper, data]
	)

	return { data, columns, isLoading, setFilters }
}
