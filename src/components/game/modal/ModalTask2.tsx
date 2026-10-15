
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

type ModalTask2Props = {
    game: GameData
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
}

export const ModalTask2 = ({ game, setModal, setGame }: ModalTask2Props) => {
    const task = game.task2 as {
        tasks: unknown
        sight_image?: string
        question?: ReactNode
    }
    const sightHint2 = game.sight_hint2 as { text?: unknown, image?: unknown } | null

    return (
        <div className={mainStyle.mt5}>
            <div className={mainStyle.preTitle}>Задание выполнено</div>
            <div className={mainStyle.titleMain}>{game.answer2 as ReactNode}</div>

            <div className={mainStyle.divider} />

            <div className={mainStyle.mb20}>

                <TaskTemplate
                    tasks={task.tasks}
                    game={game}
                    setModal={setModal}
                    setGame={setGame}
                    taskNumber="2"
                    isModal={true}
                />

                {(task.sight_image || task.question) ? (
                    <div className={`${mainStyle.card} ${gameStyle.taskCard}`}>

                        {task.sight_image ? (
                            <div className={gameStyle.taskImageThumbWrapper}>
                                <img
                                    src={task.sight_image}
                                    className={gameStyle.taskImageThumb}
                                    alt=""
                                />
                            </div>
                        ) : null}

                        {task.question ? (
                            <div className={gameStyle.taskTextWrapper}>
                                <div className={gameStyle.questionText}>
                                    {task.question}
                                </div>
                            </div>
                        ) : null}

                    </div>
                ) : null}

            </div>

            {sightHint2 ? (
                <div className={gameStyle.gameHintSection}>
                    <div className={gameStyle.gameSectionLabel}>
                        Использованная подсказка:
                    </div>
                    <Hint text={sightHint2.text} image={sightHint2.image} />
                </div>
            ) : null}

            <div className={gameStyle.gameAnswerCard}>
                <div className={gameStyle.gameSuccessBadge}>
                    <span className={gameStyle.gameSuccessIcon}>✓</span>
                </div>
                <div className={gameStyle.gameAnswerLabel}>Ваш ответ</div>
                <div className={gameStyle.gameAnswerText}>
                    {game.answer2 as ReactNode}
                </div>
            </div>
        </div>
    )
}
