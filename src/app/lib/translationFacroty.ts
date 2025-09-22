/** @format */
import { useTranslation } from 'react-i18next'
import i18next, { TOptions } from 'i18next'

type ResourceType = Record<string, string>

export const createTranslation = <TKeys extends string>(
	namespace: string,
	resource: ResourceType,
	lng: string = 'en'
) => {
	if (!i18next.hasResourceBundle(lng, namespace)) {
		i18next.addResourceBundle(lng, namespace, resource, true, true)
	}

	// hook
	function useTranslationHook() {
		const { t: tOrg, ...rest } = useTranslation<typeof namespace, TKeys>(namespace)
		const t = (key: TKeys, options?: TOptions) => tOrg(key, options)
		return { t, ...rest }
	}

	function __(key: TKeys, options?: TOptions) {
		return i18next.t(key, { ns: namespace, ...options })
	}

	return { useTranslationHook, __ }
}
