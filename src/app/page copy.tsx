/** @format */
'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input } from '@taskio/ui-kit'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputIcon } from '@taskio/ui-kit/src/components/Form/Input/InputIcon'
import { FaUser, FaRegFileCode } from 'react-icons/fa'
import axios from 'axios'
import { useState } from 'react'

type IFormInput =
	| {
			username: string
	  }
	| {
			username: string
			code: string
	  }

export default function Home() {
	const [otpInput, setOtpInput] = useState(false)

	const schema: yup.ObjectSchema<IFormInput> = yup.object({
		username: yup.string().min(3).required(),
		code: otpInput ? yup.string().min(3).required() : yup.string().nullable()
	})

	const { control, handleSubmit } = useForm<IFormInput>({
		defaultValues: {
			username: '',
			code: ''
		},
		resolver: yupResolver(schema)
	})

	// ساخت instance شخصی‌سازی شده
	const api = axios.create({
		baseURL: 'http://172.17.110.60:8000/',
		withCredentials: true,
		withXSRFToken: true,
		headers: {
			'X-Requested-With': 'XMLHttpRequest',
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})

	// 1️⃣ ابتدا CSRF Cookie بگیر
	async function getCsrfCookie() {
		await api.get('/sanctum/csrf-cookie')
	}

	// 2️⃣ درخواست لاگین
	async function login() {
		try {
			// گرفتن CSRF Cookie قبل از POST
			await getCsrfCookie()

			const login = await api.post('api/auth/login', {
				username: 'arash1@gmail.com'
			})

			if (login.data.data.code) {
				setOtpInput(true)
			}
			const verify = await api.post('api/auth/verify', {
				username: 'arash1@gmail.com',
				code: login.data.data.code
			})
			const response = await api.get('api/auth/me')

			console.log('Login success:', response.data)

			return verify.data
		} catch (error) {
			console.error('Login error:', error)
			throw error
		}
	}

	const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
		login()
	}

	return (
		<div className='flex justify-center items-center bg-indigo-900 h-screen'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='username'
					control={control}
					render={row => <Input label='First Name' icon={<InputIcon color='#fff' Icon={FaUser} />} {...row} />}
				/>

				<div
					className={`
						transition-all duration-1000
						${otpInput ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
    `}>
					<Controller
						name='code'
						control={control}
						render={row => <Input label='Code' icon={<InputIcon color='#fff' Icon={FaRegFileCode} />} {...row} />}
					/>
				</div>

				<div className='mt-2 text-center'>
					<Button type='submit' shadow>
						ok
					</Button>
				</div>
			</form>
		</div>
	)
}
