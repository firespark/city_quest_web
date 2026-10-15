
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

type ModalHintAlertProps = {
    game?: GameData
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
}

export const ModalHintAlert = ({ setModal, setGame }: ModalHintAlertProps) => {

    const { questId, token } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getHint = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<GameData>(
                `${import.meta.env.VITE_API_URL}/games/getHint/${questId}`,
                token
            )

            if (output.success == 1) {
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

    if (loader) {
        return <Loader />
    }

    return (
        <div className={`${mainStyle.container} ${mainStyle.center}`}>
            <div className={mainStyle.titleMain}>
                Применить подсказку?
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
                    onClick={() => {
                        getHint()
                    }}
                >
                    <span className={mainStyle.primaryButtonText}>
                        Показать подсказку
                    </span>
                </button>

                <button
                    type="button"
                    className={gameStyle.gameCancelLink}
                    onClick={() => setModal(null)}
                >
                    <span className={gameStyle.gameLinkText}>
                        Не нужно
                    </span>
                </button>
            </div>
        </div>
    )
}
