/** @format */
'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@taskio/ui-kit'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type IFormInput = {
	first_name: string
	last_name: string
}

const schema: yup.ObjectSchema<IFormInput> = yup.object({
	first_name: yup.string().min(3).required(),
	last_name: yup.string().min(3).required()
})

export default function Home() {
	const { control, handleSubmit } = useForm<IFormInput>({
		defaultValues: {
			first_name: '',
			last_name: ''
		},
		resolver: yupResolver(schema)
	})

	const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller name='first_name' control={control} render={row => <Input label='First Name' {...row} />} />
			<Controller name='last_name' control={control} render={row => <Input label='Last Name' {...row} />} />

			<input type='submit' />
		</form>
	)
}
