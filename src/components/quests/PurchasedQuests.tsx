
import { useState, useContext, useEffect } from 'react'

import questsStyle from '../../styles/questsStyle.module.css'
import mainStyle from '../../styles/mainStyle.module.css'

import { ConnectionError } from '../common/ConnectionError'
import { PurchasedQuest } from './PurchasedQuest'
import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

type PurchasedQuestData = {
    id: number
    [key: string]: unknown
}

export const PurchasedQuests = () => {

    const { token } = useContext(MainContext)

    const [data, setData] = useState<PurchasedQuestData[]>([])
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<PurchasedQuestData[]>(
                `${import.meta.env.VITE_API_URL}/quests/purchased`,
                token
            )

            if (output.success == 1) {
                setData(output.data!)
            } else {
                setError(output.error || 'Ошибка загрузки')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('connection_error')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loader) return <Loader />

    if (error === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    return (
        <div>
            <div className={questsStyle.blockTitle}>
                Купленные туры
            </div>

            {error && (
                <div className={mainStyle.mb20}>
                    <Error text={error} />
                </div>
            )}

            <div>
                {data.length > 0 && data.map((item, index) => (
                    <div key={index}>
                        <PurchasedQuest quest={item} />
                    </div>
                ))}

                {data.length === 0 && !error && (
                    <div className={questsStyle.emptyText}>
                        Нет купленных туров
                    </div>
                )}
            </div>
        </div>
    )
}
