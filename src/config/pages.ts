
import {
    MAIN_SCREEN,
    ABOUT_SCREEN,
    HOWPLAY_SCREEN,
    CONTACTS_SCREEN,
    PROFILE_SCREEN,
    PROFILESETTINGS_SCREEN,
    AUTH_SCREEN,
    PASSWORDRESET_SCREEN,
    SLUG_SCREEN
} from '../context/types'

export const PAGES = {
    HOME: {
        path: '/',
        screen: MAIN_SCREEN,
        meta: {
            title: 'Квест-Экскурсии | Гагара Тур',
            description: 'Городские квесты Гагара Тур. Выбирайте город и отправляйтесь навстречу приключениям.',
            robots: 'index, follow'
        }
    },

    ABOUT: {
        path: '/about',
        screen: ABOUT_SCREEN,
        meta: {
            title: 'О проекте',
            description: 'Узнайте больше о нашем проекте.',
            robots: 'index, follow'
        }
    },

    HOW_PLAY: {
        path: '/how-play',
        screen: HOWPLAY_SCREEN,
        meta: {
            title: 'Как играть | Гагара Тур',
            description: 'Правила и порядок прохождения городских квестов.',
            robots: 'index, follow'
        }
    },

    CONTACTS: {
        path: '/contacts',
        screen: CONTACTS_SCREEN,
        meta: {
            title: 'Контакты',
            description: 'Свяжитесь с командой Гагара Тур.',
            robots: 'index, follow'
        }
    },

    PROFILE: {
        path: '/profile',
        screen: PROFILE_SCREEN,
        meta: {
            title: 'Профиль',
            description: 'Личный профиль пользователя.',
            robots: 'noindex, nofollow'
        }
    },

    SETTINGS: {
        path: '/settings',
        screen: PROFILESETTINGS_SCREEN,
        meta: {
            title: 'Настройки профиля',
            description: 'Настройки аккаунта.',
            robots: 'noindex, nofollow'
        }
    },

    AUTH: {
        path: '/auth',
        screen: AUTH_SCREEN,
        meta: {
            title: 'Вход и регистрация',
            description: 'Вход и регистрация.',
            robots: 'noindex, nofollow'
        }
    },

    PASSWORD_RESET: {
        path: '/password-reset',
        screen: PASSWORDRESET_SCREEN,
        meta: {
            title: 'Восстановление пароля',
            description: 'Восстановление доступа к аккаунту.',
            robots: 'noindex, nofollow'
        }
    },

    SLUG: {
        path: '/:slug',
        screen: SLUG_SCREEN,
        meta: {
            title: 'Гагара Тур',
            description: '',
            robots: 'noindex, nofollow'
        }
    }
} as const
