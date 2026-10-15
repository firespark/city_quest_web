
import type { Dispatch, SetStateAction, ReactNode } from 'react'
import { IoLocationSharp, IoCompassOutline } from 'react-icons/io5'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { GameTitle } from '../GameTitle'
import { ProgressBar } from '../ProgressBar'
import { NextGame } from '../NextGame'

import { FormattedContent } from '../../common/FormattedContent'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type TourTemplateProps = {
    game: GameData
    setGame: Dispatch<SetStateAction<GameData>>
    setModal: Dispatch<SetStateAction<string | null>>
    nextGame: () => Promise<void>
}

export const TourTemplate = ({ game, setGame, setModal, nextGame }: TourTemplateProps) => {
    const location = String(game.sight_latitude) + ',' + String(game.sight_longitude)

    return (
        <div className={gameStyle.playTemplateContainer}>
            <GameTitle
                title={game.quest_title}
                description={`Шаг ${game.step}`}
                setModal={setModal}
            />

            <div className={gameStyle.playTemplateProgressContainer}>
                <ProgressBar
                    game={game}
                    setGame={setGame}
                    setModal={setModal}
                />
            </div>

            <div className={`${mainStyle.card} ${mainStyle.mt15}`}>

                {game.sight_image ? (
                    <div className={gameStyle.modalAnswerImageBg}>
                        <img
                            src={game.sight_image as string}
                            className={gameStyle.sightImage}
                            alt=""
                        />
                    </div>
                ) : null}

                <div className={mainStyle.p20}>
                    {game.sight_address ? (
                        <div className={gameStyle.gameDetailRow}>
                            <div className={gameStyle.gameIconWrapper}>
                                <IoLocationSharp size={18} color="#17A2B8" />
                            </div>

                            <div className={gameStyle.gameDetailValue}>
                                {game.sight_address as ReactNode}
                            </div>
                        </div>
                    ) : null}

                    {location ? (
                        <div className={gameStyle.gameDetailRow}>
                            <div className={gameStyle.gameIconWrapper}>
                                <IoCompassOutline size={18} color="#17A2B8" />
                            </div>

                            <a
                                href={`geo:0,0?q=${location}`}
                                className={gameStyle.gameLink}
                            >
                                {location}
                            </a>
                        </div>
                    ) : null}
                </div>
            </div>

            {game.sight_content ? (
                <div className={`${mainStyle.card} ${mainStyle.mt15}`}>
                    <FormattedContent text={game.sight_content} />
                </div>
            ) : null}

            <div className={mainStyle.mt15}>
                <NextGame nextGame={nextGame} />
            </div>
        </div>
    )
}
