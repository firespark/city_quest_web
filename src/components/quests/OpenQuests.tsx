
import { useState, useContext, useEffect } from 'react'
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
    country_title?: string | null
    [key: string]: unknown
}

export const OpenQuests = () => {

    const { token } = useContext(MainContext)

    const [data, setData] = useState<Record<string, OpenQuestData[]>>()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<OpenQuestData[]>(
                `${import.meta.env.VITE_API_URL}/quests/opened`,
                token
            )

            if (output.success == 1) {
                const grouped = output.data!.reduce<Record<string, OpenQuestData[]>>((acc, quest) => {
                    const country = quest.country_title || 'Другие'

                    if (!acc[country]) acc[country] = []

                    acc[country].push(quest)
                    return acc
                }, {})

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
                Открытые туры
            </div>

            {data && Object.keys(data).length > 0 ? (
                Object.keys(data).map((countryName) => (
                    <div key={countryName} className={questsStyle.countryBlock}>

                        <div className={questsStyle.countryHeader}>
                            <IoGlobeOutline
                                size={18}
                                color="#7F8C8D"
                                className={mainStyle.mr10}
                            />

                            <span className={questsStyle.countryTitle}>
                                {countryName}
                            </span>
                        </div>

                        {data[countryName].map((item, index) => (
                            <div key={item.id || index}>
                                <OpenQuest quest={item} />
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <div className={questsStyle.emptyText}>
                    Нет открытых туров
                </div>
            )}

            {error && <Error text={error} />}
        </div>
    )
}
