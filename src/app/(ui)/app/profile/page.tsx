/** @format */
'use client'
import { API_Logout } from '@/(ui)/auth/services'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@taskio/ui-kit'
import { useRouter } from 'next/navigation'

export default function App() {
	const router = useRouter()
	const logoutMutation = useMutation({
		mutationFn: API_Logout,
		onSuccess: () => router.replace('/auth')
	})

	return (
		<div className='bg-black h-screen'>
			<Button onClick={logoutMutation.mutateAsync}>Logout</Button>
		</div>
	)
}
