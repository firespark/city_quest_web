
import { createContext, useContext, type ReactNode } from 'react'

import { Loader } from '../common/Loader'
import { ConnectionError } from '../common/ConnectionError'

import { FeaturedCard } from './FeaturedCard'
import { useFeaturedQuests } from './useFeaturedQuests'

import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

export type FeaturedQuestData = {
    id: number
    title: string
    image: string
    city?: string | null
    city_slug?: string | null
    sights_count: number
    slug: string | null
    paid: boolean
    available: boolean
    status: 'finished' | 'in_progress' | null
}

type FeaturedQuestsProps = {
    offset: number
    title: string
    subtitle?: string
}

const FeaturedQuestsContext = createContext<
    ReturnType<typeof useFeaturedQuests> | null
>(null)

export const FeaturedQuestsProvider = ({
    children
}: {
    children: ReactNode
}) => {
    const featuredQuests = useFeaturedQuests()

    return (
        <FeaturedQuestsContext.Provider value={featuredQuests}>
            {children}
        </FeaturedQuestsContext.Provider>
    )
}

export const FeaturedQuests = ({
    offset,
    title,
    subtitle
}: FeaturedQuestsProps) => {

    const featuredQuests = useContext(FeaturedQuestsContext)

    if (!featuredQuests) {
        return null
    }

    const { data, loader, error, fetchData } = featuredQuests

    if (loader) {
        return offset === 0 ? (
            <div className={questsStyle.featuredSection}>
                <Loader />
            </div>
        ) : null
    }

    if (error) {
        if (error === 'connection_error' && offset === 0) {
            return (
                <div className={questsStyle.featuredSection}>
                    <ConnectionError onRetry={fetchData} />
                </div>
            )
        }

        return null
    }

    const visibleQuests = data.slice(offset, offset + 3)

    if (visibleQuests.length === 0) {
        return null
    }

    return (
        <div className={questsStyle.featuredSection}>
            <div className={mainStyle.contentContainer}>
                <div className={mainStyle.welcomeTitle}>{title}</div>

                {subtitle && (
                    <div className={mainStyle.description}>{subtitle}</div>
                )}

                <div className={`${mainStyle.cardGrid} ${mainStyle.questGrid}`}>
                    {visibleQuests.map(quest => (
                        <FeaturedCard
                            key={quest.id}
                            quest={quest}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
