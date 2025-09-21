/** @format */
'use client'

import { DataTable } from '@taskio/ui-kit'

import { useUserManagement } from './hooks/useUserManagement'
import Search from './components/Search'

export default function UserManagement() {
	const { data, columns, isLoading, setFilters } = useUserManagement()

	return (
		<div className='container mx-auto'>
			<Search setFilters={setFilters} isLoading={isLoading} />
			<DataTable data={data} columns={columns} title='User Management' isLoading={isLoading} setFilters={setFilters} />
		</div>
	)
}
