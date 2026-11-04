
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { MainContext } from './context/mainContext'

import { QuestsScreen } from './screens/QuestsScreen'
import { QuestScreen } from './screens/QuestScreen'
import {
    ComingSoonScreen,
    type ComingSoonQuestData
} from './screens/ComingSoonScreen'
import { NotFoundScreen } from './screens/NotFoundScreen'

import { Loader } from './components/common/Loader'
import { ConnectionError } from './components/common/ConnectionError'
import { Error as ErrorMessage } from './components/common/Error'
import mainStyle from './styles/mainStyle.module.css'

import { setDynamicPageTitle } from './LayoutMeta'
import { contentDescription } from './scripts/pageMeta'


type CityData = {
    id: number
    title: string
    slug: string
    country_id: number
    image?: string
    content?: string | string[] | null
}

type ApiResponse<T> = {
    success: number
    data?: T
    error?: string
}

type SlugPage =
    | { type: 'city' }
    | { type: 'quest' }
    | { type: 'comingSoon'; quest: ComingSoonQuestData }
    | { type: 'notFound' }
    | null


const getBySlug = async <T,>(
    type: 'cities' | 'quests',
    slug: string,
    signal: AbortSignal,
    token = ''
): Promise<T | null> => {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/${type}/bySlug/${encodeURIComponent(slug)}`,
        {
            method: 'GET',
            signal,
            headers: {
                'Accept': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        }
    )

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
    }

    const output = await response.json() as ApiResponse<T>

    if (output.success !== 1) {
        if (output.error?.trim().toLowerCase() === 'not found') {
            return null
        }

        throw new Error(output.error || 'Ошибка API')
    }

    return output.data ?? null
}


export const SlugRoute = () => {

    const { slug } = useParams()

    const {
        token,
        setCountryId,
        setCityData,
        setQuestId
    } = useContext(MainContext)

    const [page, setPage] = useState<SlugPage>(null)
    const [fatalError, setFatalError] = useState<Error | null>(null)
    const [retry, setRetry] = useState(0)


    useEffect(() => {
        setPage(null)
        setFatalError(null)

        if (!slug) {
            setPage({ type: 'notFound' })
            return
        }

        const controller = new AbortController()

        const loadPage = async () => {

            const city = await getBySlug<CityData>(
                'cities',
                slug,
                controller.signal
            )

            if (controller.signal.aborted) return

            if (city) {
                await setCountryId(city.country_id)

                if (controller.signal.aborted) return

                setCityData({
                    id: city.id,
                    title: city.title
                })

                setDynamicPageTitle(city.title, true, {
                    description: contentDescription(city.content) || `Городские квесты в городе ${city.title}. Выбирай маршрут и открывай город вместе с Гагара Тур.`,
                    image: city.image ? { url: city.image, alt: `Изображение города «${city.title}»` } : undefined,
                })
                setPage({ type: 'city' })
                return
            }

            const quest = await getBySlug<ComingSoonQuestData>(
                'quests',
                slug,
                controller.signal,
                token
            )

            if (controller.signal.aborted) return

            if (quest) {
                setQuestId(quest.id)

                setDynamicPageTitle(
                    quest.title,
                    (quest.published !== false || quest.coming_soon) && quest.city_published !== false,
                    {
                        description: contentDescription(quest.content) || `Квест «${quest.title}» в городе ${quest.city}. Подробности маршрута на сайте Гагара Тур.`,
                        image: quest.image ? { url: quest.image, alt: `Изображение квеста «${quest.title}»` } : undefined,
                    }
                )

                if (quest.coming_soon) {
                    setPage({
                        type: 'comingSoon',
                        quest
                    })
                } else {
                    setPage({ type: 'quest' })
                }

                return
            }

            setPage({ type: 'notFound' })
        }

        void loadPage().catch((error: unknown) => {
            if (controller.signal.aborted) return

            setFatalError(
                error instanceof Error
                    ? error
                    : new Error(String(error))
            )
        })

        return () => {
            controller.abort()
        }

    }, [slug, token, retry])


    if (fatalError) {
        return fatalError instanceof TypeError || !navigator.onLine ? (
            <ConnectionError onRetry={() => setRetry(value => value + 1)} />
        ) : (
            <div className={mainStyle.sitePage}>
                <ErrorMessage text={fatalError.message} />
            </div>
        )
    }

    if (page?.type === 'notFound') {
        return <NotFoundScreen />
    }

    if (page?.type === 'city') {
        return <QuestsScreen />
    }

    if (page?.type === 'comingSoon') {
        return <ComingSoonScreen quest={page.quest} />
    }

    if (page?.type === 'quest') {
        return <QuestScreen />
    }

    return <Loader />
}
