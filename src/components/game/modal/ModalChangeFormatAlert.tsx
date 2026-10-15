
import { useState, useContext, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'
import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type ModalChangeFormatAlertProps = {
    game: GameData
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
}

export const ModalChangeFormatAlert = ({ game, setModal, setGame }: ModalChangeFormatAlertProps) => {

    const { questId, token, setAnswersState } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const newFormatId = game.format_id === 1 ? 2 : 1
    const newFormatName = newFormatId === 2 ? '«Экскурсия»' : '«Квест»'

    const changeFormat = async () => {
        setError(null)
        setLoader(true)

        const postdata = { format_id: newFormatId }

        try {
            const output = await Http.post<GameData>(
                `${import.meta.env.VITE_API_URL}/games/setFormat/${questId}`,
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

    return (
        <div className={`${mainStyle.container} ${mainStyle.center}`}>
            <div className={mainStyle.titleMain}>
                Переключиться на формат {newFormatName}?
            </div>

            <div className={`${mainStyle.formSubtitle} ${mainStyle.mb20}`}>
                Вы уверены, что хотите сменить формат? Текущий прогресс будет сброшен.
            </div>

            {error && (
                <div className={mainStyle.mb20}>
                    <Error text={error} />
                </div>
            )}

            <div className={gameStyle.gameActions}>
                <button
                    type="button"
                    className={mainStyle.primaryButton}
                    onClick={changeFormat}
                >
                    <span className={mainStyle.primaryButtonText}>
                        Да, сменить
                    </span>
                </button>

                <button
                    type="button"
                    className={gameStyle.gameCancelLink}
                    onClick={() => setModal(null)}
                >
                    <span className={gameStyle.gameLinkText}>
                        Отмена
                    </span>
                </button>
            </div>
        </div>
    )
}
