
import type { Dispatch, SetStateAction, ReactNode } from 'react'
import { IoLocationSharp, IoCompassOutline } from 'react-icons/io5'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

import { ResetButton } from '../quests/ResetButton'
import { FormattedContent } from '../common/FormattedContent'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type FinishTourProps = {
    text: unknown
    game: GameData
    setResetModalVisible: Dispatch<SetStateAction<boolean>>
}

export const FinishTour = ({ text, game, setResetModalVisible }: FinishTourProps) => {
    const location = `${game.sight_latitude},${game.sight_longitude}`

    return (
        <div className={gameStyle.playTemplateContainer}>

            <div className={`${mainStyle.card} ${mainStyle.container} ${mainStyle.mb15}`}>
                <div className={`${mainStyle.subtitle} ${mainStyle.textCenter}`}>
                    {text as ReactNode}
                </div>
            </div>

            <div className={mainStyle.card}>
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

            <div className={mainStyle.mt20}>
                <ResetButton setModalVisible={setResetModalVisible} />
            </div>
        </div>
    )
}
