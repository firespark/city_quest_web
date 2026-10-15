
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

import { Sight } from './Sight'
import { TaskSign } from './TaskSign'
import { ResetButton } from '../quests/ResetButton'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type FinishQuestProps = {
    text: unknown
    game: GameData
    setModal: Dispatch<SetStateAction<string | null>>
    setResetModalVisible: Dispatch<SetStateAction<boolean>>
}

export const FinishQuest = ({ text, game, setModal, setResetModalVisible }: FinishQuestProps) => {
    return (
        <div className={mainStyle.card}>
            <div className={mainStyle.container}>
                <div className={`${mainStyle.subtitle} ${mainStyle.textCenter}`}>
                    {text as ReactNode}
                </div>
            </div>

            <div className={`${mainStyle.divider} ${mainStyle.mb20}`} />

            <div className={mainStyle.center}>
                <div className={`${mainStyle.preTitle} ${mainStyle.mb20}`}>
                    Финишная достопримечательность
                </div>

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
            </div>

            <div className={`${mainStyle.divider} ${mainStyle.mt20}`} />

            <div className={mainStyle.mb30}>
                <ResetButton setModalVisible={setResetModalVisible} />
            </div>
        </div>
    )
}
