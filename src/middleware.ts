/** @format */

import { AuthMiddleware } from '@/middlewares/AuthMiddleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/app')) {
		const isAuthenticated = await AuthMiddleware()
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL('/auth', request.nextUrl))
		}
	}

	if (pathname === '/auth') {
		const isAuthenticated = await AuthMiddleware()
		if (isAuthenticated) {
			return NextResponse.redirect(new URL('/app/profile', request.nextUrl))
		}
	}
}

export const config = {
	matcher: ['/app/:path*', '/auth']
}
