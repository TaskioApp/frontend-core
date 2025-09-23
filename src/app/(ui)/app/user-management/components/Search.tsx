/** @format */
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, FormElement } from '@taskio/ui-kit'
import { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaUser } from 'react-icons/fa'
import * as yup from 'yup'
import { UserManagementRequest, UserManagementSearch } from '../types'

type PropsType = {
	setFilters: Dispatch<SetStateAction<UserManagementRequest>>
	isLoading: boolean
}

const Search = ({ setFilters, isLoading }: PropsType) => {
	const schema: yup.ObjectSchema<UserManagementSearch> = yup.object({
		first_name: yup.string().notRequired(),
		last_name: yup.string().notRequired(),
		username: yup.string().notRequired(),
		email: yup.string().notRequired(),
		mobile: yup.string().notRequired()
	})

	const { control, handleSubmit, reset } = useForm<UserManagementSearch>({
		defaultValues: {
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			mobile: ''
		},
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<UserManagementSearch> = async (data: UserManagementSearch): Promise<void> => {
		setFilters((p: UserManagementRequest) => ({ ...p, ...data }))
	}

	return (
		<Card title='Search' icon={<FaUser size={18} />}>
			<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
				<div className='flex flex-col md:flex-row w-full justify-center gap-2'>
					<FormElement>
						<Controller
							name='first_name'
							control={control}
							render={row => <FormElement.Input {...row} label='First Name' />}
						/>
					</FormElement>
					<Controller
						name='last_name'
						control={control}
						render={row => <FormElement.Input {...row} label='Last Name' />}
					/>
					<Controller
						name='username'
						control={control}
						render={row => <FormElement.Input {...row} label='Username' />}
					/>
					<Controller name='email' control={control} render={row => <FormElement.Input {...row} label='Email' />} />

					<Controller name='mobile' control={control} render={row => <FormElement.Input {...row} label='Mobile' />} />
				</div>

				<div className='flex mt-2 justify-center gap-2'>
					<Button.Search isLoading={isLoading} />
					<Button.Reset isLoading={isLoading} onClick={() => reset()} />
				</div>
			</form>
		</Card>
	)
}

export default Search
