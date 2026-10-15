
import type { Dispatch, SetStateAction } from 'react'

import gameStyle from '../../../styles/gameStyle.module.css'

import { GameTitle } from '../GameTitle'
import { ProgressBar } from '../ProgressBar'
import { Sight } from '../Sight'
import { Task1 } from '../Task1'
import { Task2 } from '../Task2'
import { TaskSign } from '../TaskSign'
import { NextGame } from '../NextGame'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type PlayTemplateProps = {
    game: GameData
    setGame: Dispatch<SetStateAction<GameData>>
    setModal: Dispatch<SetStateAction<string | null>>
    nextGame: () => Promise<void>
}

export const PlayTemplate = ({ game, setGame, setModal, nextGame }: PlayTemplateProps) => {

    return (
        <div className={gameStyle.playTemplateContainer}>
            <GameTitle
                title={game.quest_title}
                description={`Уровень ${game.step}`}
                setModal={setModal}
            />

            <div className={gameStyle.playTemplateProgressContainer}>
                <ProgressBar
                    game={game}
                    setGame={setGame}
                    setModal={setModal}
                />
            </div>

            {game.status == 0 ? (
                <div className={gameStyle.playTemplateTaskContainer}>
                    <Task1
                        game={game}
                        setGame={setGame}
                        setModal={setModal}
                    />
                </div>
            ) : null}

            {game.status == 1 ? (
                <div className={gameStyle.playTemplateTaskContainer}>
                    {game.sight_image ? (
                        <Sight
                            setModal={setModal}
                            title={game.sight_title}
                            image={game.sight_image}
                        />
                    ) : null}

                    <div className={gameStyle.playTemplateSignsRow}>
                        <TaskSign
                            number="1"
                            setModal={setModal}
                        />
                        <TaskSign
                            number="2"
                            disabled={true}
                        />
                    </div>

                    <Task2
                        game={game}
                        setGame={setGame}
                        setModal={setModal}
                    />
                </div>
            ) : null}

            {game.status == 2 ? (
                <div className={gameStyle.playTemplateTaskContainer}>
                    <Sight
                        setModal={setModal}
                        title={game.sight_title}
                        image={game.sight_image}
                    />

                    <div className={gameStyle.playTemplateSignsRow}>
                        <TaskSign
                            number="1"
                            setModal={setModal}
                        />
                        <TaskSign
                            number="2"
                            setModal={setModal}
                        />
                    </div>

                    <NextGame
                        nextGame={nextGame}
                    />
                </div>
            ) : null}
        </div>
    )
}
