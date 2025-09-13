/** @format */

import { httpService } from '@/lib/httpService'
import { LoginRequest, LoginResponse, VerifyRequest, VerifyResponse } from './interfaces'

export const API_CSRF = async () => {
	await httpService.get('/sanctum/csrf-cookie')
	return true
}

export const API_Login = async (data: LoginRequest): Promise<LoginResponse> => {
	const response = await httpService.post<LoginResponse>('/auth/login', data)

	return response.data
}

export const API_Verify = async (data: VerifyRequest): Promise<VerifyResponse> => {
	const response = await httpService.post<VerifyResponse>('/auth/verify', data)

	return response.data
}

export const API_Me = async (): Promise<VerifyResponse> => {
	const response = await httpService.get<VerifyResponse>('/auth/me')

	return response.data
}

export const API_Logout = async () => {
	await httpService.post('/auth/logout')
	return true
}
