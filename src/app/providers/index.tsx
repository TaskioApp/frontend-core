/** @format */

'use client'

import { ReactElement } from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'
import { AuthProvider } from './AuthProvider'

export const Providers = ({ children }: { children: ReactElement }) => {
	return (
		<ReactQueryProvider>
			<AuthProvider>{children}</AuthProvider>
		</ReactQueryProvider>
	)
}
