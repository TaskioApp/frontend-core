/** @format */

import { ResponseMessage } from '@/types'

export interface LoginRequest {
	username: string
}

export interface LoginResponse extends ResponseMessage {
	data: {
		code: string
	}
}

export interface VerifyRequest {
	username: string
	code: string
}

export interface VerifyResponse extends ResponseMessage {
	data: {
		user: object
	}
}
