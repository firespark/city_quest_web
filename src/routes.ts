
import { matchPath } from 'react-router-dom'

import { PAGES } from './config/pages'

export const ROUTES = Object.fromEntries(
    Object.entries(PAGES).map(([key, page]) => [
        key,
        page.path
    ])
) as {
        [K in keyof typeof PAGES]: typeof PAGES[K]['path']
    }

export const getPageByPath = (pathname: string) => {
    const path = pathname.replace(/\/+$/, '') || '/'

    return Object.values(PAGES).find(
        page => matchPath({ path: page.path, end: true }, path)
    ) ?? null
}

export const getPathByScreen = (screen: string): string | null => {
    return Object.values(PAGES).find(
        page => page.screen === screen
            && !page.path.includes(':')
            && !page.path.includes('*')
    )?.path ?? null
}

export const getScreenByPath = (pathname: string): string | null => {
    return getPageByPath(pathname)?.screen ?? null
}

export const slugUrl = (slug: string): string => {
    return ROUTES.SLUG.replace(':slug', encodeURIComponent(slug))
}

export const purchaseUrl = (slug: string): string => {
    return `${ROUTES.PURCHASE}?${new URLSearchParams({ quest: slug })}`
}

// После авторизации возвращаем только на страницу покупки внутри сайта.
export const purchaseReturnUrl = (value: string | null): string | null => {
    if (!value || value.split('?')[0] !== ROUTES.PURCHASE) return null
    const slug = new URLSearchParams(value.slice(value.indexOf('?') + 1)).get('quest')
    return slug ? purchaseUrl(slug) : null
}
