/** @format */

type DefaultPaginationFilters = { page: number; per_page: number; page_size: number; sort: 'desc' | 'asc' }

export const DEFAULT_PAGINATION_FILTERS: DefaultPaginationFilters = {
	page: 1,
	per_page: 10,
	page_size: 20,
	sort: 'desc'
}
