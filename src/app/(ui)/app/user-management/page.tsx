/** @format */
'use client'

import { DataTable } from '@taskio/ui-kit'

import { useUserManagement } from './hooks/useUserManagement'

export default function UserManagement() {
	const { data, columns, isLoading, setFilters } = useUserManagement()

	return (
		<div className='container mx-auto'>
			<DataTable data={data} columns={columns} title='User Management' isLoading={isLoading} setFilters={setFilters} />
		</div>
	)
}
