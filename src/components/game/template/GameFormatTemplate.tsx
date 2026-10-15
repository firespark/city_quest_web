
import { useContext, useState, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { GameFormat } from '../GameFormat'

import { Loader } from '../../common/Loader'
import { Error } from '../../common/Error'

import { MainContext } from '../../../context/mainContext'
import { Http } from '../../../scripts/http'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type GameFormatTemplateProps = {
    setGame: Dispatch<SetStateAction<GameData>>
}

export const GameFormatTemplate = ({ setGame }: GameFormatTemplateProps) => {

    const { questId, token } = useContext(MainContext)
    const [selectedId, setSelectedId] = useState(1)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const setFormat = async () => {
        setError(null)
        setLoader(true)

        try {
            const postdata = { format_id: selectedId }

            const output = await Http.post<GameData>(
                `${import.meta.env.VITE_API_URL}/games/setFormat/${questId}`,
                postdata,
                token
            )

            if (output.success == 1) {
                setGame(output.data!)
            } else {
                setError(
                    output.error ||
                    'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом'
                )
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    if (loader) return <Loader />

    return (
        <div className={gameStyle.modeTemplateContainer}>
            <div className={mainStyle.center}>
                <div className={mainStyle.titleMain}>
                    Выбери формат
                </div>
            </div>

            <GameFormat
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />

            {error && (
                <div>
                    <Error text={error} />
                </div>
            )}

            <div className={`${mainStyle.center} ${mainStyle.mt5}`}>
                <button
                    type="button"
                    className={mainStyle.primaryButton}
                    onClick={setFormat}
                >
                    <span className={mainStyle.primaryButtonText}>
                        Начать
                    </span>
                </button>
            </div>
        </div>
    )
}
