
import { useContext, useState, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

import hintImage from '../../../assets/img/hint.png'

import { MainContext } from '../../context/mainContext'
import { Loader } from '../common/Loader'
import { Http } from '../../scripts/http'

export type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type TaskAnswerFormProps = {
    game: GameData
    setGame: Dispatch<SetStateAction<GameData>>
    setModal: Dispatch<SetStateAction<string | null>>
    answerNumber: 1 | 2
}

export const TaskAnswerForm = ({
    game,
    setGame,
    setModal,
    answerNumber
}: TaskAnswerFormProps) => {

    const { questId, token, answersState, setAnswersState } = useContext(MainContext)

    const [inputResults, setInputResults] = useState<Record<number, number>>({})
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const inputCount = game[answerNumber === 1 ? 'inputs1' : 'inputs2'] as number
    const showHint = game[answerNumber === 1 ? 'sight_hint1' : 'sight_hint2']

    const answersHandler = (key: number, value: string) => {
        value = value.replace(/\s/g, '')
        setAnswersState({ ...answersState, [key]: value } as unknown[])
    }

    const checkAnswer = async () => {
        setError(null)

        const allEmpty = Array.from(
            { length: inputCount },
            (_, i) => !String(answersState[i] ?? '').trim()
        ).every(Boolean)

        if (allEmpty) {
            const results: Record<number, number> = {}

            for (let i = 0; i < inputCount; i++) {
                results[i] = 0
            }

            setInputResults(results)
            return
        }

        setLoader(true)

        try {
            const postdata = {
                quest_answer: answersState,
                answer_number: answerNumber
            }

            const output = await Http.post<GameData>(
                `${import.meta.env.VITE_API_URL}/games/checkAnswer/${questId}`,
                postdata,
                token
            )

            if (output.success == 1) {
                setInputResults(
                    (output.data!.inputResults || {}) as Record<number, number>
                )

                if (!output.data!.errors) {
                    setGame(output.data!)
                    setAnswersState([])
                    setModal(`answer${answerNumber}`)
                }
            } else {
                setError(output.error || 'Произошла ошибка при проверке ответа')
            }

        } catch (e) {
            console.error('Error:', e)
            setError('Произошла ошибка при отправке')
        } finally {
            setLoader(false)
        }
    }

    const inputs = []

    for (let i = 0; i < inputCount; i++) {
        let style = null

        if (typeof inputResults[i] !== 'undefined') {
            style = inputResults[i] == 1
                ? mainStyle.inputCorrect
                : mainStyle.inputError
        }

        inputs.push(
            <div key={i} className={gameStyle.inputWrapper}>
                <input
                    type="text"
                    placeholder={inputCount == 1 ? 'Ответ' : `Слово ${i + 1}`}
                    className={`${mainStyle.modernInput} ${style || ''}`}
                    value={(answersState[i] as string) || ''}
                    onChange={(event) => answersHandler(i, event.target.value)}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                />
            </div>
        )
    }

    return (
        <>
            {showHint ? (
                <div className={gameStyle.hintContainer}>
                    <button
                        type="button"
                        className={mainStyle.plainButton}
                        onClick={() => setModal(`hint${answerNumber}`)}
                    >
                        <div className={gameStyle.hintPill}>
                            <img
                                src={hintImage}
                                className={gameStyle.hintIcon}
                                alt=""
                            />
                            <span className={gameStyle.hintTextActive}>
                                Подсказка
                            </span>
                        </div>
                    </button>
                </div>
            ) : null}

            {loader ? (
                <div className={mainStyle.mt30}>
                    <Loader />
                </div>
            ) : (
                <>
                    <div className={mainStyle.mt15}>
                        {inputs}
                    </div>

                    <div className={mainStyle.mt15}>
                        <button
                            type="button"
                            className={mainStyle.primaryButton}
                            onClick={checkAnswer}
                        >
                            <span className={mainStyle.buttonText}>
                                Ответ
                            </span>
                        </button>
                    </div>
                </>
            )}

            {error ? (
                <div className={mainStyle.errorContainer}>
                    <div className={mainStyle.errorText}>
                        {error}
                    </div>
                </div>
            ) : null}
        </>
    )
}
