
import { useContext, useState, useEffect } from 'react'

import mainStyle from '../styles/mainStyle.module.css'

import { GameTemplate } from '../components/game/template/GameTemplate'
import { ModalTemplate } from '../components/game/template/ModalTemplate'

import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ConnectionError } from '../components/common/ConnectionError'

import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

export const GameScreen = () => {
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { questId, token, setAnswersState } = useContext(MainContext)

    const [modal, setModal] = useState<string | null>(null)
    const [game, setGame] = useState<GameData>([] as unknown as GameData)

    const fetchData = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<GameData>(`${import.meta.env.VITE_API_URL}/games/get/${questId}`, token)

            if (output.success == 1) {
                setGame(output.data!)
            } else {
                if (output.error) {
                    setError(output.error)
                } else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const nextGame = async () => {
        setAnswersState([])
        setError(null)
        setLoader(true)

        let method: string

        if (game.is_level) {
            let level = game.step
            level++
            method = `${import.meta.env.VITE_API_URL}/games/getLevel/${questId}/${level}`
        } else {
            method = `${import.meta.env.VITE_API_URL}/games/next/${questId}`
        }

        try {
            const output = await Http.get<GameData>(method, token)

            if (output.success == 1) {
                setGame(output.data!)
            } else {
                if (output.error) {
                    setError(output.error)
                } else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    if (loader) {
        return <Loader />
    }

    if (error === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }
    if (error) {
        return <Error text={error} />
    }

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            {
                (modal) ?
                    <ModalTemplate
                        game={game}
                        modal={modal}
                        setModal={setModal}
                        setGame={setGame}
                        nextGame={nextGame}
                    />
                    :
                    <GameTemplate
                        game={game}
                        setGame={setGame}
                        setModal={setModal}
                        nextGame={nextGame}
                    />
            }
        </div>
    )
}
