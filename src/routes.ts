
import {
    MAIN_SCREEN,
    ABOUT_SCREEN,
    HOWPLAY_SCREEN,
    PROFILE_SCREEN,
    CONTACTS_SCREEN,
    PROFILESETTINGS_SCREEN,
    AUTH_SCREEN,
    PASSWORDRESET_SCREEN
} from './context/types'

export const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    HOW_PLAY: '/how-play',
    PROFILE: '/profile',
    CONTACTS: '/contacts',
    SETTINGS: '/settings',
    AUTH: '/auth',
    PASSWORD_RESET: '/password-reset'
} as const

const screenPaths: Record<string, string> = {
    [MAIN_SCREEN]: ROUTES.HOME,
    [ABOUT_SCREEN]: ROUTES.ABOUT,
    [HOWPLAY_SCREEN]: ROUTES.HOW_PLAY,
    [PROFILE_SCREEN]: ROUTES.PROFILE,
    [CONTACTS_SCREEN]: ROUTES.CONTACTS,
    [PROFILESETTINGS_SCREEN]: ROUTES.SETTINGS,
    [AUTH_SCREEN]: ROUTES.AUTH,
    [PASSWORDRESET_SCREEN]: ROUTES.PASSWORD_RESET
}

export const getPathByScreen = (screen: string): string | null => {
    return screenPaths[screen] ?? null
}

export const getScreenByPath = (pathname: string): string | null => {
    const path = pathname.replace(/\/+$/, '') || '/'

    return Object.keys(screenPaths).find(
        screen => screenPaths[screen] === path
    ) ?? null
}
