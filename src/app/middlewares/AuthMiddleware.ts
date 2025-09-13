/** @format */

import { cookies } from 'next/headers'

export async function AuthMiddleware() {
	const cookieArray = (await cookies()).getAll()
	const cookieHeader = cookieArray.map(c => `${c.name}=${c.value}`).join('; ')

	const response = await fetch('http://172.17.110.60:8000/api/auth/me', {
		method: 'GET',
		headers: {
			Cookie: cookieHeader,
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Referer: process.env.NEXT_PUBLIC_APP_URL!
		},
		credentials: 'include'
	})

	return response.ok
}
