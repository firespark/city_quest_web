
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { TaskTemplate } from '../TaskTemplate'
import { Hint } from '../Hint'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type ModalTask1Props = {
    game: GameData
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
}

export const ModalTask1 = ({ game, setModal, setGame }: ModalTask1Props) => {
    const task = game.task1 as { tasks: unknown }
    const sightHint1 = game.sight_hint1 as { text?: unknown, image?: unknown } | null

    return (
        <div className={mainStyle.mt5}>

            <div className={mainStyle.preTitle}>Задание выполнено</div>
            <div className={mainStyle.titleMain}>{game.sight_title as ReactNode}</div>

            <div className={mainStyle.divider} />

            <div className={mainStyle.mb20}>
                <TaskTemplate
                    tasks={task.tasks}
                    game={game}
                    setModal={setModal}
                    setGame={setGame}
                    taskNumber="1"
                    isModal={true}
                />
            </div>

            {sightHint1 && (
                <div className={gameStyle.gameHintSection}>
                    <div className={gameStyle.gameSectionLabel}>
                        Использованная подсказка:
                    </div>
                    <Hint text={sightHint1.text} image={sightHint1.image} />
                </div>
            )}

            <div className={gameStyle.gameAnswerCard}>
                <div className={gameStyle.gameSuccessBadge}>
                    <span className={gameStyle.gameSuccessIcon}>✓</span>
                </div>
                <div className={gameStyle.gameAnswerLabel}>Ваш ответ</div>
                <div className={gameStyle.gameAnswerText}>
                    {game.answer1 as ReactNode}
                </div>
            </div>
        </div>
    )
}
