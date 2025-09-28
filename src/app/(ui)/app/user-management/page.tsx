/** @format */
'use client'

import { DataTable } from '@taskio/ui-kit'

import { __, useUserManagement } from './hooks'
import { Search } from './components'
import { Modal } from '@taskio/ui-kit/src/components/Modal'

export default function UserManagement() {
	const { data, columns, isLoading, setFilters, isOpen, setIsOpen, selectedRow } = useUserManagement()

	return (
		<div className='container mx-auto mt-10'>
			<Search setFilters={setFilters} isLoading={isLoading} />
			<DataTable
				data={data}
				columns={columns}
				title={__('userManagement')}
				isLoading={isLoading}
				setFilters={setFilters}
			/>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false)
				}}
				title={selectedRow?.email as string}>
				ok
			</Modal>
		</div>
	)
}
