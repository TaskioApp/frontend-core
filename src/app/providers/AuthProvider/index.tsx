/** @format */

'use client'

import { createContext, ReactElement, useContext, useState } from 'react'
import { AuthContextType, AuthenticationInitialState } from './types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const initialState: AuthenticationInitialState = {
	isAuthenticated: false,
	user: {}
}

export const AuthProvider = ({ children }: { children: ReactElement }) => {
	const [state, setAuth] = useState<AuthenticationInitialState>(initialState)

	return (
		<AuthContext.Provider
			value={{
				state,
				setAuth
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
