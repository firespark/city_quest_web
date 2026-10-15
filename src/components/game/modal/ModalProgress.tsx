
import { useState, useContext, type Dispatch, type SetStateAction, type ReactNode } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import finishImage from '../../../../assets/img/finish.png'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type ModalProgressProps = {
    game: GameData
    setGame: Dispatch<SetStateAction<GameData>>
    setModal: Dispatch<SetStateAction<string | null>>
}

export const ModalProgress = ({ game, setGame, setModal }: ModalProgressProps) => {

    const { questId, token } = useContext(MainContext)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const levels = game.levels as number
    const stepTotal = game.step_total as number

    const content: ReactNode[] = []

    const setLevel = async (value: number) => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<GameData>(
                `${import.meta.env.VITE_API_URL}/games/getLevel/${questId}/${value}`,
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

    for (let i = 1; i <= levels; i++) {
        let st = gameStyle.progressMedalDisabled
        let textSt = gameStyle.progressTextDisabled

        if (i < stepTotal) {
            st = gameStyle.progressMedalDone
            textSt = gameStyle.progressTextLight
        }

        if (i == levels) {
            st = gameStyle.progressMedalFinish
        }

        if (i == stepTotal) {
            st = gameStyle.progressMedalInProgress
            textSt = gameStyle.progressTextLight
        }

        if (i == levels && i == stepTotal) {
            st = gameStyle.progressMedalFinishDone
        }

        const isCurrent = i == game.step

        if (isCurrent) {
            textSt = gameStyle.progressTextLight
        }

        const medalClassName = [
            gameStyle.progressMedal,
            st,
            isCurrent ? gameStyle.progressMedalCurrent : ''
        ].filter(Boolean).join(' ')

        const medalContent = i == levels
            ? (
                <img
                    src={finishImage}
                    className={gameStyle.progressFinishIcon}
                    alt=""
                />
            )
            : <span className={textSt}>{i}</span>

        if (i <= stepTotal) {
            content.push(
                <button
                    key={i}
                    type="button"
                    className={medalClassName}
                    aria-label={i == levels ? 'Финиш' : `Этап ${i}`}
                    onClick={() => setLevel(i)}
                >
                    {medalContent}
                </button>
            )
        } else {
            content.push(
                <div
                    key={i}
                    className={medalClassName}
                >
                    {medalContent}
                </div>
            )
        }
    }

    if (loader) {
        return <Loader />
    }

    return (
        <div className={`${mainStyle.container} ${mainStyle.center}`}>
            <div className={mainStyle.mb20}>
                <div className={mainStyle.titleMain}>
                    Карта тура
                </div>
            </div>

            {error && (
                <div className={mainStyle.mb15}>
                    <Error text={error} />
                </div>
            )}

            <div className={gameStyle.progressGrid}>
                {content}
            </div>
        </div>
    )
}
