
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

import { TaskTemplate } from './TaskTemplate'
import { TaskAnswerForm, type GameData } from './TaskAnswerForm'

type Task2Props = {
    game: GameData
    setGame: Dispatch<SetStateAction<GameData>>
    setModal: Dispatch<SetStateAction<string | null>>
}

export const Task2 = ({ game, setGame, setModal }: Task2Props) => {

    const task = game.task2 as {
        tasks: unknown
        sight_image?: string | null
        question?: ReactNode
    }

    return (
        <div className={mainStyle.container}>
            <div className={mainStyle.titleMain}>
                Ответь на вопрос
            </div>

            <TaskTemplate
                tasks={task.tasks}
                game={game}
                setGame={setGame}
                setModal={setModal}
                taskNumber="2"
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

            <TaskAnswerForm
                game={game}
                setGame={setGame}
                setModal={setModal}
                answerNumber={2}
            />
        </div>
    )
}
