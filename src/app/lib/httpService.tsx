/** @format */

import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
export const baseURL: string = process.env.NEXT_PUBLIC_API_URL!

const routesWithoutApiPrefix = ['/sanctum/csrf-cookie']

export const httpService: AxiosInstance = axios.create({
	baseURL,
	withCredentials: true,
	withXSRFToken: true,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

httpService.interceptors.request.use((config: InternalAxiosRequestConfig<unknown>) => {
	if (config.url) {
		if (routesWithoutApiPrefix.includes(config.url)) {
			config.baseURL = baseURL.replace(/\/api$/, '')
		}
	}
	return config
})

httpService.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response?.data?.message) {
			toast(response.data.message, { type: 'success' })
		}
		return Promise.resolve(response)
	},
	async (error: AxiosError<{ message?: string }, unknown>) => {
		const status = error.response?.status
		const message = error.response?.data?.message

		if (status === 401) {
			// refresh token
		}

		const needsLogin = error?.response?.status === 419 || error?.response?.status === 401

		if (needsLogin) {
			if (typeof window !== 'undefined') {
				const { pathname } = window.location
				if (pathname !== '/auth/login') {
					toast('Login again', { type: 'error' })
					localStorage.clear()
					window.location.href = '/auth'
				}
			}
		} else if (message) {
			toast(message, { type: 'error' })
		}

		return Promise.reject(error)
	}
)
