
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { MainContext } from './context/mainContext'

import { QuestsScreen } from './screens/QuestsScreen'
import { QuestScreen } from './screens/QuestScreen'

import { Loader } from './components/common/Loader'

import { setDynamicPageTitle } from './LayoutMeta'

type CityData = {
    id: number
    title: string
    slug: string
    country_id: number
}

type QuestData = {
    id: number
    title: string
    slug: string
}

type ApiResponse<T> = {
    success: number
    data?: T
    error?: string
}

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

    const [page, setPage] = useState<'city' | 'quest' | 'notFound' | null>(null)
    const [fatalError, setFatalError] = useState<Error | null>(null)

    useEffect(() => {
        if (!slug) {
            setPage('notFound')
            return
        }

        const controller = new AbortController()

        const loadPage = async () => {

            setPage(null)

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

                setDynamicPageTitle(city.title)
                setPage('city')
                return
            }

            const quest = await getBySlug<QuestData>(
                'quests',
                slug,
                controller.signal,
                token
            )

            if (controller.signal.aborted) return

            if (quest) {
                setQuestId(quest.id)

                setDynamicPageTitle(quest.title)
                setPage('quest')
                return
            }

            setPage('notFound')
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

    }, [slug, token])

    if (fatalError) {
        throw fatalError
    }

    if (page === 'notFound') {
        return <div>Страница не найдена</div>
    }

    if (page === 'city') {
        return <QuestsScreen />
    }

    if (page === 'quest') {
        return <QuestScreen />
    }

    return <Loader />
}
