
import { useState, useContext, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'
import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type ModalSkipAlertProps = {
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
}

export const ModalSkipAlert = ({ setModal, setGame }: ModalSkipAlertProps) => {

    const { questId, token, setAnswersState } = useContext(MainContext)

    const [reason, setReason] = useState(1)
    const [comment, setComment] = useState<string | null>(null)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getSkip = async () => {
        setError(null)
        setLoader(true)

        const postdata = { reason_id: reason, comment: comment }

        try {
            const output = await Http.post<GameData>(
                `${import.meta.env.VITE_API_URL}/games/getSkip/${questId}`,
                postdata,
                token
            )

            if (output.success == 1) {
                setAnswersState([])
                setGame(output.data!)
                setModal(null)
            } else {
                setError(
                    output.error === 'connection_error'
                        ? 'Отсутствует подключение к интернету'
                        : (output.error || 'Произошла ошибка')
                )
            }
        } catch (e) {
            console.log('Error:', (e as Error).message)
            setError('Отсутствует подключение к интернету')
        } finally {
            setLoader(false)
        }
    }

    if (loader) return <Loader />

    const renderRadioItem = (id: number, text: string) => {
        const isSelected = reason === id

        return (
            <button
                type="button"
                className={`${mainStyle.radioCard} ${isSelected ? mainStyle.radioCardActive : ''}`}
                onClick={() => setReason(id)}
            >
                <div className={`${mainStyle.radioOuter} ${isSelected ? mainStyle.radioOuterActive : ''}`}>
                    {isSelected ? <div className={mainStyle.radioInner} /> : null}
                </div>
                <span className={`${mainStyle.radioText} ${isSelected ? mainStyle.radioTextActive : ''}`}>
                    {text}
                </span>
            </button>
        )
    }

    return (
        <div className={mainStyle.container}>
            <div className={mainStyle.titleMain}>Пропустить задание?</div>
            <div className={mainStyle.formSubtitle}>Пожалуйста, укажите причину:</div>

            <div className={mainStyle.mt20}>
                {renderRadioItem(1, "Я не знаю правильный ответ")}
                {renderRadioItem(2, "Я знаю правильный ответ, но он не подходит")}
                {renderRadioItem(3, "Другая причина")}

                {reason === 3 && (
                    <textarea
                        placeholder="Напишите причину"
                        className={mainStyle.modernTextarea}
                        rows={3}
                        onChange={(event) => setComment(event.target.value)}
                    />
                )}
            </div>

            {error && (
                <div className={mainStyle.mb15}>
                    <Error text={error} />
                </div>
            )}

            <div className={`${mainStyle.textCenter} ${mainStyle.mt15}`}>
                <button
                    type="button"
                    className={mainStyle.primaryButton}
                    onClick={() => {
                        getSkip()
                    }}
                >
                    <span className={mainStyle.primaryButtonText}>
                        Пропустить
                    </span>
                </button>
            </div>
        </div>
    )
}
