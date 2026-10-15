
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

import { TaskTemplate } from './TaskTemplate'
import { TaskAnswerForm, type GameData } from './TaskAnswerForm'

type Task1Props = {
    game: GameData
    setGame: Dispatch<SetStateAction<GameData>>
    setModal: Dispatch<SetStateAction<string | null>>
}

export const Task1 = ({ game, setGame, setModal }: Task1Props) => {

    const task = game.task1 as { tasks: unknown }

    return (
        <div className={mainStyle.container}>
            <div className={mainStyle.titleMain}>
                Угадай достопримечательность
            </div>

            <TaskTemplate
                tasks={task.tasks}
                game={game}
                setGame={setGame}
                setModal={setModal}
                taskNumber="1"
            />

            <TaskAnswerForm
                game={game}
                setGame={setGame}
                setModal={setModal}
                answerNumber={1}
            />
        </div>
    )
}
