
import { useState, useContext, useEffect, useCallback } from 'react'

import questsStyle from '../../styles/questsStyle.module.css'

import { ConnectionError } from '../common/ConnectionError'
import { PurchasedQuest } from './PurchasedQuest'
import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

type PurchasedQuestData = {
    id: number
    slug: string
    [key: string]: unknown
}

export const PurchasedQuests = () => {

    const { token } = useContext(MainContext)

    const [data, setData] = useState<PurchasedQuestData[]>([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<PurchasedQuestData[]>(
                `${import.meta.env.VITE_API_URL}/quests/purchased`,
                token
            )

            if (output.success === 1 && Array.isArray(output.data)) {
                setData(output.data)
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

    if (data.length === 0) return null

    return (
        <div>

            <h2 className={questsStyle.blockTitle}>
                Купленные туры
            </h2>

            {data.map(quest => (
                <PurchasedQuest
                    key={quest.id}
                    quest={quest}
                />
            ))}

        </div>
    )
}
