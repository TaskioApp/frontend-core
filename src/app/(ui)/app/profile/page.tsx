/** @format */
'use client'
import { useTranslation } from 'react-i18next'

export default function Profile() {
	const { t } = useTranslation('user-management')
	return <div>{t('search')}</div>
}
