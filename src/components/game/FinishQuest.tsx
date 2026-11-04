import questsStyle from '../../styles/questsStyle.module.css'

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
                <div className={`${mainStyle.formTitle} ${mainStyle.mt16} ${mainStyle.mb16} ${mainStyle.textCenter} ${mainStyle.heading}`}>{text as ReactNode}</div>
            </div>

            <div className={`${mainStyle.divider} ${mainStyle.mb24}`} />

            <div className={mainStyle.center}>
                <div className={`${questsStyle.eyebrow} ${mainStyle.green} ${mainStyle.textCenter} ${mainStyle.mb24}`}>
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

            <div className={`${mainStyle.divider} ${mainStyle.mt24}`} />

            <div className={mainStyle.mb32}>
                <ResetButton setModalVisible={setResetModalVisible} />
            </div>
        </div>
    )
}
