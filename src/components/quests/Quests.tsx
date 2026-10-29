
import {
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react'

import { FeaturedCard } from './FeaturedCard'
import type { FeaturedQuestData } from './FeaturedQuests'

import {
    QuestFilters,
    type QuestFilter
} from './QuestFilters'

import { Loader } from '../common/Loader'
import { ConnectionError } from '../common/ConnectionError'

import { Http } from '../../scripts/http'
import { MainContext } from '../../context/mainContext'

import questsStyle from '../../styles/questsStyle.module.css'

type QuestsProps = {
    cityId: number
    showFilters?: boolean
}

export const Quests = ({
    cityId,
    showFilters = false
}: QuestsProps) => {

    const { token, cityData } = useContext(MainContext)

    const [data, setData] = useState<FeaturedQuestData[]>([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<QuestFilter>('all')

    const fetchData = useCallback(async () => {
        setLoader(true)
        setError(null)

        try {
            const output = await Http.get<FeaturedQuestData[]>(
                `${import.meta.env.VITE_API_URL}/quests/all/${cityId}`,
                token
            )

            if (output.success === 1 && Array.isArray(output.data)) {

                const quests = [...output.data]

                quests.sort((a, b) => {
                    const getOrder = (status: FeaturedQuestData['status']) => {
                        if (status === 'in_progress') return 0
                        if (status === 'finished') return 2
                        return 1
                    }

                    return getOrder(a.status) - getOrder(b.status)
                })

                setData(quests)

            } else {
                setError(
                    output.error === 'connection_error'
                        ? 'connection_error'
                        : 'load_error'
                )
            }

        } catch (error) {
            console.error('Error loading quests:', error)
            setError('connection_error')

        } finally {
            setLoader(false)
        }

    }, [cityId, token])

    useEffect(() => {
        void fetchData()
    }, [fetchData])

    const counts = {
        all: data.length,
        free: data.filter(quest => !quest.paid).length,
        paid: data.filter(quest => quest.paid).length
    }

    const filteredData = data.filter(quest => {
        if (filter === 'free') return !quest.paid
        if (filter === 'paid') return quest.paid
        return true
    })

    return (
        <section
            id="quests-list"
            className={questsStyle.questsListSection}
        >

            <div className={questsStyle.questsListHeader}>

                <div>
                    <div className={questsStyle.questsListEyebrow}>
                        Маршруты и приключения
                    </div>

                    <h1 className={questsStyle.questsListTitle}>
                        Квесты в городе {cityData?.title}
                    </h1>

                    <p className={questsStyle.questsListDescription}>
                        Каждый маршрут открывает город с новой стороны.
                    </p>
                </div>

                {!loader && !error && data.length > 0 && (
                    <div className={questsStyle.questsListCount}>
                        Квестов: {data.length}
                    </div>
                )}

            </div>

            {loader ? (
                <div className={questsStyle.questsListLoading}>
                    <Loader />
                </div>

            ) : error === 'connection_error' ? (
                <ConnectionError onRetry={fetchData} />

            ) : !error && data.length > 0 ? (
                <>
                    {showFilters && (
                        <QuestFilters
                            filter={filter}
                            setFilter={setFilter}
                            counts={counts}
                        />
                    )}

                    {filteredData.length > 0 && (
                        <div className={questsStyle.featuredGrid}>
                            {filteredData.map(quest => (
                                <FeaturedCard
                                    key={quest.id}
                                    quest={quest}
                                />
                            ))}
                        </div>
                    )}
                </>

            ) : null}

        </section>
    )
}
