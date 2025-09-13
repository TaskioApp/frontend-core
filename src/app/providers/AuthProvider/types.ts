/** @format */

import { Dispatch, SetStateAction } from 'react'

export type AuthenticationInitialState =
	| {
			isAuthenticated: boolean
			user: object
	  }
	| {
			isAuthenticated: boolean
	  }

export interface AuthContextType {
	state: AuthenticationInitialState
	setAuth: Dispatch<SetStateAction<AuthenticationInitialState>>
}
