
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
        page => page.path === path
    ) ?? null
}

export const getPathByScreen = (screen: string): string | null => {
    return Object.values(PAGES).find(
        page => page.screen === screen
    )?.path ?? null
}

export const getScreenByPath = (pathname: string): string | null => {
    return getPageByPath(pathname)?.screen ?? null
}
