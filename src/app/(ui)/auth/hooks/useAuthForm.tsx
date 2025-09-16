/** @format */

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoginRequest, LoginResponse, VerifyRequest, VerifyResponse } from '@/auth/services/interfaces'
import { API_CSRF, API_Login, API_Me, API_Verify } from '@/auth/services'
import { useRouter } from 'next/navigation'

export type AuthenticationStep = 'LOGIN' | 'VERIFY'

type IFormInput = LoginRequest | VerifyRequest

export function useAuthForm() {
	const router = useRouter()
	const [step, setStep] = useState<AuthenticationStep>('LOGIN')

	const schema: yup.ObjectSchema<IFormInput> = yup.object({
		username: yup.string().min(3).required(),
		code: step === 'VERIFY' ? yup.string().required() : yup.string().notRequired()
	})

	const { control, handleSubmit, getValues, setValue } = useForm<IFormInput>({
		defaultValues: {
			username: '',
			code: ''
		},
		resolver: yupResolver(schema)
	})

	useQuery({ queryKey: ['API_CSRF'], queryFn: API_CSRF })

	const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
		mutationFn: (data: LoginRequest) => API_Login(data)
	})

	const verifyMutation = useMutation<VerifyResponse, Error, VerifyRequest>({
		mutationFn: (data: VerifyRequest) => API_Verify(data)
	})

	const meMutation = useMutation({
		mutationFn: () => API_Me()
	})

	const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
		if (step === 'LOGIN') {
			await loginMutation.mutateAsync(data as LoginRequest)
			setStep('VERIFY')
		}
		if (step === 'VERIFY') {
			await verifyMutation.mutateAsync(data as VerifyRequest)
			router.replace('/app/profile')
		}
	}

	const loading = loginMutation.isPending || verifyMutation.isPending || meMutation.isPending

	return {
		control,
		handleSubmit,
		onSubmit,
		loginMutation,
		getValues,
		isLoading: loading,
		setStep,
		setValue,
		step
	}
}
