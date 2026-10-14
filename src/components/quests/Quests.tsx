
import { useState, useEffect, useContext } from 'react'

import { Quest, type QuestData } from './Quest'
import { QuestFilters } from './QuestFilters'

import { Loader } from '../common/Loader'

import mainStyle from '../../styles/mainStyle.module.css'
import { ConnectionError } from '../common/ConnectionError'

import { Http } from '../../scripts/http'
import { MainContext } from '../../context/mainContext'

export const Quests = ({ cityId, showFilters = false }: { cityId: number, showFilters?: boolean }) => {

    const [data, setData] = useState<QuestData[] | null>(null)
    const { token } = useContext(MainContext)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [filter, setFilter] = useState('all')

    const fetchData = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<QuestData[]>(`${import.meta.env.VITE_API_URL}/quests/all/${cityId}`, token)

            if (output.success == 1) {
                setData(output.data!.sort((a, b) => {
                    const statusOrder = ['in_progress', null, 'finished']

                    const aIndex = statusOrder.indexOf(a.status)
                    const bIndex = statusOrder.indexOf(b.status)

                    return aIndex - bIndex
                }))
            }
            else {
                if (output.error) {
                    setError(output.error)
                }
                else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        }
        catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        }
        finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loader) {
        return <Loader />
    }

    if (error === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }
    if (error) {
        return (
            <div className={mainStyle.mb20}>
                <span className={mainStyle.errorText}>{error}</span>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className={mainStyle.wrapper}>
                <div className={`${mainStyle.description} ${mainStyle.textCenter} ${mainStyle.mt20}`}>
                    В этом городе пока нет доступных квест-туров.
                </div>
            </div>
        )
    }

    const filteredData = data.filter(item => {
        if (filter === 'free') return !item.paid
        if (filter === 'paid') return item.paid
        return true
    })

    return (
        <div className={mainStyle.wrapper}>

            {showFilters && (
                <QuestFilters filter={filter} setFilter={setFilter} />
            )}

            {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <div key={item.id || index}>
                        <Quest quest={item} />
                    </div>
                ))
            ) : (
                <div className={`${mainStyle.description} ${mainStyle.textCenter} ${mainStyle.mt20}`}>
                    В этой категории пока нет квест-туров.
                </div>
            )}

        </div>
    )
}
