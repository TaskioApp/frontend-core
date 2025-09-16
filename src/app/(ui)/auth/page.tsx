/** @format */
'use client'

import { Controller } from 'react-hook-form'
import { Button } from '@taskio/ui-kit'
import { InputIcon } from '@taskio/ui-kit/src/components/Form/Input/InputIcon'
import { FaUser } from 'react-icons/fa'
import { FormElement } from '@taskio/ui-kit/src/components/Form'
import { useAuthForm } from './hooks/useAuthForm'
import ResendCode from './components/ResendCode'

export default function Login() {
	const { control, handleSubmit, onSubmit, loginMutation, getValues, setValue, isLoading, step } = useAuthForm()

	const onResendCode = async () => {
		setValue('code', '')
		await loginMutation.mutateAsync({ username: getValues('username') })
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<form onSubmit={handleSubmit(onSubmit)} className='w-96'>
				<Controller
					name='username'
					control={control}
					render={row => (
						<FormElement.Input
							{...row}
							label='First Name'
							disabled={step === 'VERIFY'}
							icon={<InputIcon color='#fff' Icon={FaUser} />}
						/>
					)}
				/>
				{step === 'VERIFY' && (
					<>
						<div className='mt-3'>
							<Controller
								name='code'
								control={control}
								render={row => <FormElement.OtpInput {...row} label='Code' />}
							/>
						</div>
						<ResendCode onResendCode={onResendCode} />
					</>
				)}
				<div className='mt-2 text-center'>
					<Button shadow isLoading={isLoading}>
						ok
					</Button>
				</div>
			</form>
		</div>
	)
}
