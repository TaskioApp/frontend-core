/** @format */

import { httpService } from '@/lib/httpService'
import { UserManagementRequest, UserManagementResponse } from '../types'

export const API_UserManagement_Index = async (data: UserManagementRequest): Promise<UserManagementResponse> => {
	const response = await httpService.post<UserManagementResponse>('/user-managements/index', data)

	return response.data
}
