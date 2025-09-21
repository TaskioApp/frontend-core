/** @format */
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, FormElement } from '@taskio/ui-kit'
import { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FaUser } from 'react-icons/fa'
import * as yup from 'yup'

type PropsType = {
	setFilters: Dispatch<SetStateAction<UserManagementSearch>>
	isLoading: boolean
}
type UserManagementSearch = {
	first_name: string
	last_name: string
	username: string
	email: string
	mobile: string
}

const Search = ({ setFilters, isLoading }: PropsType) => {
	const schema: yup.ObjectSchema<UserManagementSearch> = yup.object({
		first_name: yup.string().notRequired(),
		last_name: yup.string().notRequired(),
		username: yup.string().notRequired(),
		email: yup.string().notRequired(),
		mobile: yup.string().notRequired()
	})

	const { control, handleSubmit } = useForm<UserManagementSearch>({
		defaultValues: {
			first_name: '',
			last_name: '',
			username: '',
			email: '',
			mobile: ''
		},
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<UserManagementSearch> = async (data: UserManagementSearch) => {
		console.log(data)
		setFilters(data)
	}

	return (
		<Card>
			<form onSubmit={handleSubmit(onSubmit)} className='w-full'>
				<div className='flex flex-col md:flex-row w-full justify-center'>
					<Controller
						name='first_name'
						control={control}
						render={row => (
							<FormElement.Input
								{...row}
								label='First Name'
								icon={<FormElement.InputIcon color='#fff' Icon={FaUser} />}
							/>
						)}
					/>
					<Controller
						name='last_name'
						control={control}
						render={row => (
							<FormElement.Input
								{...row}
								label='Last Name'
								icon={<FormElement.InputIcon color='#fff' Icon={FaUser} />}
							/>
						)}
					/>
					<Controller
						name='username'
						control={control}
						render={row => (
							<FormElement.Input
								{...row}
								label='Username'
								icon={<FormElement.InputIcon color='#fff' Icon={FaUser} />}
							/>
						)}
					/>
					<Controller
						name='email'
						control={control}
						render={row => (
							<FormElement.Input {...row} label='Email' icon={<FormElement.InputIcon color='#fff' Icon={FaUser} />} />
						)}
					/>

					<Controller
						name='mobile'
						control={control}
						render={row => (
							<FormElement.Input {...row} label='Mobile' icon={<FormElement.InputIcon color='#fff' Icon={FaUser} />} />
						)}
					/>
				</div>

				<div className='mt-2 text-center'>
					<Button shadow isLoading={isLoading}>
						Search
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Search
