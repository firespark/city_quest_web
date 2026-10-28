import { useContext, useEffect, useState } from 'react'

import { Http } from '../scripts/http'
import { slugUrl } from '../routes'

import mainStyle from '../styles/mainStyle.module.css'
import detailStyle from '../styles/questDetailStyle.module.css'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { QuestImageDetail } from '../components/quests/quest_detail/QuestImageDetail'
import { QuestDetailButton } from '../components/quests/quest_detail/QuestDetailButton'
import { QuestStats } from '../components/quests/QuestStats'
import { QuestContent } from '../components/quests/QuestContent'
import { QuestContent2 } from '../components/quests/QuestContent2'

import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ResetModal } from '../components/quests/ResetModal'
import { ConnectionError } from '../components/common/ConnectionError'
import { MainContext } from '../context/mainContext'


type QuestScreenData = {
    id: number
    title: string
    city: string
    city_slug: string
    image: string
    start_point: string | null
    end_point: string | null
    sights_count: number
    content: string | string[] | null
    content2: string | string[] | null
    paid: boolean
    available: boolean
    is_auth: boolean
    status: 'finished' | 'in_progress' | null
}


export const QuestScreen = () => {
    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    const {
        questId,
        token,
        changeScreen,
        setAnswersState
    } = useContext(MainContext)

    const [data, setData] = useState<QuestScreenData | null>(null)
    const [modalVisible, setModalVisible] = useState(false)


    const fetchData = async () => {
        setAnswersState([])
        setLoadError(null)
        setLoader(true)

        try {
            const output = await Http.get<QuestScreenData>(
                `${import.meta.env.VITE_API_URL}/quests/get/${questId}`,
                token
            )

            if (output.success === 1 && output.data) {
                console.log('Quest API data:', output.data)
                setData(output.data)
            } else {
                setLoadError(output.error || 'Ошибка загрузки')
            }

        } catch (error) {
            console.error('Error:', error)
            setLoadError('Ошибка сети')

        } finally {
            setLoader(false)
        }
    }


    useEffect(() => {
        void fetchData()
    }, [questId])


    if (loader) return <Loader />

    if (loadError === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    if (loadError) return <Error text={loadError} />

    if (!data) return <Error text="Квест не найден" />


    let progress = 'Начать приключение'

    if (data.status === 'in_progress') {
        progress = 'Продолжить'
    } else if (data.status === 'finished') {
        progress = 'Посмотреть игру'
    }


    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={detailStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: '/' },
                            { label: data.city, to: slugUrl(data.city_slug) },
                            { label: data.title }
                        ]}
                    />

                    <QuestImageDetail
                        image={data.image}
                        city={data.city}
                        title={data.title}
                        paid={data.paid}
                        available={data.available}
                        status={data.status}
                        progress={progress}
                        changeScreen={changeScreen}
                    />

                    <QuestStats
                        startPoint={data.start_point}
                        endPoint={data.end_point}
                        sightsCount={data.sights_count}
                    />

                    <QuestContent
                        content={data.content}
                    />

                    <QuestContent2
                        content={data.content2}
                    />

                    <QuestDetailButton
                        questId={data.id}
                        title={data.title}
                        available={data.available}
                        isAuth={data.is_auth}
                        status={data.status}
                        progress={progress}
                        changeScreen={changeScreen}
                        onPurchaseSuccess={fetchData}
                        setModalVisible={setModalVisible}
                    />

                </div>
            </main>

            <ResetModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onSuccess={fetchData}
            />

        </div>
    )
}