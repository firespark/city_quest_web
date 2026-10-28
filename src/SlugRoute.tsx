
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { MainContext } from './context/mainContext'

import { QuestsScreen } from './screens/QuestsScreen'
import { QuestScreen } from './screens/QuestScreen'
import {
    ComingSoonScreen,
    type ComingSoonQuestData
} from './screens/ComingSoonScreen'

import { Loader } from './components/common/Loader'

import { setDynamicPageTitle } from './LayoutMeta'


type CityData = {
    id: number
    title: string
    slug: string
    country_id: number
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

                setDynamicPageTitle(city.title)
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

                setDynamicPageTitle(quest.title)

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

    }, [slug, token])


    if (fatalError) {
        throw fatalError
    }

    if (page?.type === 'notFound') {
        return <div>Страница не найдена</div>
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
