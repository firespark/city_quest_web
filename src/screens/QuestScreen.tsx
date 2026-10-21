
import { useContext, useState, useEffect } from 'react'

import mainStyle from '../styles/mainStyle.module.css'
import questsStyle from '../styles/questsStyle.module.css'

import { FormattedContent } from '../components/common/FormattedContent'
import { QuestTitle } from '../components/quests/QuestTitle'
import { QuestImage } from '../components/quests/QuestImage'
import { StartFinish } from '../components/quests/StartFinish'
import { StartButton } from '../components/quests/StartButton'
import { ResetButton } from '../components/quests/ResetButton'
import { RegisterButton } from '../components/quests/RegisterButton'
import { BuyButton } from '../components/quests/BuyButton'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ResetModal } from '../components/quests/ResetModal'
import { ConnectionError } from '../components/common/ConnectionError'
import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

type QuestScreenData = {
    id: number
    status?: string | null
    content2?: string | string[] | null
    [key: string]: unknown
}

export const QuestScreen = () => {
    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)
    const { questId, token, changeScreen, setAnswersState } = useContext(MainContext)
    const [data, setData] = useState<QuestScreenData>([] as unknown as QuestScreenData)
    const [modalVisible, setModalVisible] = useState(false)

    const fetchData = async () => {
        setAnswersState([])
        setLoadError(null)
        setLoader(true)
        try {
            const output = await Http.get<QuestScreenData>(`${import.meta.env.VITE_API_URL}/quests/get/${questId}`, token)
            if (output && output.success == 1) {
                setData(output.data!)
            } else {
                setLoadError(output.error || 'Ошибка загрузки')
            }
        } catch (e) {
            console.error('Error:', e)
            setLoadError('Ошибка сети')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [questId])

    if (loader) return <Loader />
    if (loadError === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }
    if (loadError) return <Error text={loadError} />

    let progress = "Начать приключение"
    if (data.status === "in_progress") {
        progress = "Продолжить"
    } else if (data.status === "finished") {
        progress = "Посмотреть игру"
    }

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            
            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <QuestImage data={data} />

                <div className={questsStyle.questSheet}>

                    <div className={mainStyle.card}>
                        <QuestTitle
                            title={data.title}
                            city={data.city}
                        />
                        <StartFinish
                            start={data.start_point}
                            finish={data.end_point}
                            sights_count={data.sights_count}
                        />
                    </div>

                    <div className={`${mainStyle.card} ${mainStyle.mt15}`}>
                        <FormattedContent text={data.content} />
                    </div>

                    {data.content2 && (
                        <div>
                            <div className={mainStyle.mt20}>
                                {!data.available ? (
                                    data.is_auth ? (
                                        <BuyButton
                                            questId={data.id}
                                            onSuccess={fetchData}
                                        />
                                    ) : (
                                        <RegisterButton />
                                    )
                                ) : (
                                    <>
                                        <StartButton
                                            changeScreen={changeScreen}
                                            progress={progress}
                                        />
                                    </>
                                )}
                            </div>

                            <div className={`${mainStyle.card} ${mainStyle.mt30}`}>
                                <FormattedContent text={data.content2} />
                            </div>
                        </div>
                    )}

                    <div className={mainStyle.mt20}>
                        {!data.available ? (
                            data.is_auth ? (
                                <BuyButton
                                    questId={data.id}
                                    onSuccess={fetchData}
                                />
                            ) : (
                                <RegisterButton />
                            )
                        ) : (
                            <>
                                <StartButton
                                    changeScreen={changeScreen}
                                    progress={progress}
                                />
                                {data.status ? <ResetButton setModalVisible={setModalVisible} /> : null}
                            </>
                        )}
                    </div>

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
