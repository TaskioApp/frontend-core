/** @format */

export interface PaginationResponse<T> {
	data: T[]
	links: Links
	meta: Meta
}

export interface PaginationLink {
	url: string | null
	label: string
	page: number | null
	active: boolean
}

export interface Links {
	first: string
	last: string
	prev: string | null
	next: string | null
}

export interface Meta {
	current_page: number
	from: number | null
	last_page: number
	links: PaginationLink[]
	path: string
	per_page: number
	to: number | null
	total: number
}

export interface PaginationRequest {
	per_page: number
	page_size: number
	page: number
}
