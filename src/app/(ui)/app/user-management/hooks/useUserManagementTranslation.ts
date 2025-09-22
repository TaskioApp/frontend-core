/** @format */
import UserManagementResourceEn from './../locales/en.json'
import { createTranslation } from '@/lib/translationFacroty'

export type UserManagementKeys = keyof typeof UserManagementResourceEn

export const { useTranslationHook: useUserManagementTranslation, __ } = createTranslation<UserManagementKeys>(
	'user-management',
	UserManagementResourceEn
)
