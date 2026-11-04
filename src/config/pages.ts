
import {
    MAIN_SCREEN,
    ABOUT_SCREEN,
    HOWPLAY_SCREEN,
    CONTACTS_SCREEN,
    PROFILE_SCREEN,
    PROFILESETTINGS_SCREEN,
    AUTH_SCREEN,
    PASSWORDRESET_SCREEN,
    SLUG_SCREEN,
    USERAGREEMENT_SCREEN,
    PRIVACYPOLICY_SCREEN,
    NOTFOUND_SCREEN,
} from '../context/types.ts'

export type OpenGraphImage = {
    url: string
    alt: string
    width?: number
    height?: number
    type?: string
}

export type OpenGraphMeta = {
    title?: string
    description?: string
    type: string
    siteName: string
    locale: string
    image: OpenGraphImage
}

export type PageMeta = {
    title: string
    description: string
    robots: string
    canonical?: string
    openGraph?: Partial<OpenGraphMeta>
}

// Общие настройки карточек ссылок. Для отдельной страницы можно задать meta.openGraph.
export const OPEN_GRAPH: OpenGraphMeta = {
    type: 'website',
    siteName: 'Гагара Тур',
    locale: 'ru_RU',
    image: {
        url: '/about-city.png',
        alt: 'Изображение блока «О проекте»: путешественница с картой на фоне исторического города',
        type: 'image/png',
        width: 1619,
        height: 971,
    },
}

export const PAGES = {
    HOME: {
        path: '/',
        screen: MAIN_SCREEN,
        meta: {
            title: 'Квест-Экскурсии | Гагара Тур',
            description: 'Городские квесты Гагара Тур. Выбирайте город и отправляйтесь навстречу приключениям.',
            robots: 'index, follow',
            openGraph: {
                image: {
                    url: '/cats.webp',
                    alt: 'Изображение квеста «Котики в Тбилиси»',
                    width: 900,
                    height: 673,
                    type: 'image/webp',
                },
            },
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

    USER_AGREEMENT: {
        path: '/user-agreement',
        screen: USERAGREEMENT_SCREEN,
        meta: {
            title: 'Пользовательское соглашение',
            description: 'Условия использования сервиса и приобретения доступа к городским квестам.',
            robots: 'index, follow'
        }
    },

    PRIVACY_POLICY: {
        path: '/privacy-policy',
        screen: PRIVACYPOLICY_SCREEN,
        meta: {
            title: 'Политика конфиденциальности',
            description: 'Обработка персональных данных и порядок удаления аккаунта.',
            robots: 'index, follow'
        }
    },

    SLUG: {
        path: '/:slug',
        screen: SLUG_SCREEN,
        meta: {
            title: 'Гагара Тур',
            description: 'Городские квесты и необычные маршруты Гагара Тур.',
            robots: 'noindex, nofollow'
        }
    },

    NOT_FOUND: {
        path: '*',
        screen: NOTFOUND_SCREEN,
        meta: {
            title: '404 — Страница не найдена',
            description: 'Запрашиваемая страница не найдена.',
            robots: 'noindex, nofollow'
        }
    }
} as const
