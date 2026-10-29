
import { useState, useContext, useEffect, useCallback } from 'react'
import { IoGlobeOutline } from 'react-icons/io5'

import questsStyle from '../../styles/questsStyle.module.css'
import mainStyle from '../../styles/mainStyle.module.css'

import { OpenQuest } from './OpenQuest'
import { Loader } from '../common/Loader'
import { Error } from '../common/Error'
import { ConnectionError } from '../common/ConnectionError'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

type OpenQuestData = {
    id?: number | string
    slug: string
    country_title?: string | null
    [key: string]: unknown
}

export const OpenQuests = () => {

    const { token } = useContext(MainContext)

    const [data, setData] = useState<Record<string, OpenQuestData[]> | null>(null)
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<OpenQuestData[]>(
                `${import.meta.env.VITE_API_URL}/quests/opened`,
                token
            )

            if (output.success === 1 && Array.isArray(output.data)) {
                const grouped = output.data.reduce<Record<string, OpenQuestData[]>>(
                    (acc, quest) => {
                        const country = quest.country_title || 'Другие'

                        if (!acc[country]) {
                            acc[country] = []
                        }

                        acc[country].push(quest)

                        return acc
                    },
                    {}
                )

                setData(grouped)
            } else {
                setError(output.error || 'Ошибка загрузки')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('connection_error')
        } finally {
            setLoader(false)
        }
    }, [token])

    useEffect(() => {
        void fetchData()
    }, [fetchData])

    if (loader) return <Loader />

    if (error === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    if (error) return <Error text={error} />

    if (!data || Object.keys(data).length === 0) {
        return null
    }

    return (
        <div>

            <h2 className={questsStyle.blockTitle}>
                Открытые туры
            </h2>

            {Object.entries(data).map(([countryName, quests]) => (
                <div
                    key={countryName}
                    className={questsStyle.countryBlock}
                >

                    <div className={questsStyle.countryHeader}>
                        <IoGlobeOutline
                            size={18}
                            className={mainStyle.mr10}
                            aria-hidden="true"
                        />

                        <span className={questsStyle.countryTitle}>
                            {countryName}
                        </span>
                    </div>

                    {quests.map((quest, index) => (
                        <OpenQuest
                            key={quest.id ?? index}
                            quest={quest}
                        />
                    ))}

                </div>
            ))}

        </div>
    )
}
