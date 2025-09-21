/** @format */

import { PaginationRequest, PaginationResponse } from '@/types/pagination'

export interface UserManagementResponse extends PaginationResponse<User> {
	data: User[]
}

export interface UserManagementRequest extends PaginationRequest {
	first_name: string
}

export type User = {
	id: number
	username: string | null
	email: string | null
	first_name: string | null
	last_name: string | null
	socket_id: string | null
	banned_at: string | null
	activated_at: string | null
	email_verified_at: string | null
	last_logged_in_at: string | null
	avatar: string | null
	created_at: string
	updated_at: string
	deleted_at: string | null
}
