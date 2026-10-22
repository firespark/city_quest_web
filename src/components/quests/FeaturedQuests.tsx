
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
    sights_count: number
    slug: string | null
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
            <section className={questsStyle.featuredSection}>
                <Loader />
            </section>
        ) : null
    }

    if (error) {
        if (error === 'connection_error' && offset === 0) {
            return (
                <section className={questsStyle.featuredSection}>
                    <ConnectionError onRetry={fetchData} />
                </section>
            )
        }

        return null
    }

    const visibleQuests = data.slice(offset, offset + 3)

    if (visibleQuests.length === 0) {
        return null
    }

    return (
        <section className={questsStyle.featuredSection}>
            <div className={questsStyle.featuredInner}>
                <h2 className={mainStyle.welcomeTitle}>
                    {title}
                </h2>

                {subtitle && (
                    <p className={mainStyle.description}>
                        {subtitle}
                    </p>
                )}

                <div className={questsStyle.featuredGrid}>
                    {visibleQuests.map(quest => (
                        <FeaturedCard
                            key={quest.id}
                            quest={quest}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
