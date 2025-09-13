/** @format */

import { httpService } from '@/lib/httpService'
import { LoginRequest, LoginResponse, VerifyRequest, VerifyResponse } from './types'

export const API_Login = async (data: LoginRequest): Promise<LoginResponse> => {
	const response = await httpService.post<LoginResponse>('/auth/login', data)

	return response.data
}

export const API_Verify = async (data: VerifyRequest): Promise<VerifyResponse> => {
	const response = await httpService.post<VerifyResponse>('/auth/verify', data)

	return response.data
}
