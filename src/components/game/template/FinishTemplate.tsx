
import { useContext, useState, type Dispatch, type SetStateAction } from 'react'

import { MainContext } from '../../../context/mainContext'
import { QUEST_SCREEN } from '../../../context/types'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { ProgressBar } from '../ProgressBar'
import { GameTitle } from '../GameTitle'

import { FinishQuest } from '../FinishQuest'
import { FinishTour } from '../FinishTour'

import { ResetModal } from '../../quests/ResetModal'
import { Quests } from '../../quests/Quests'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type FinishTemplateProps = {
    title: unknown
    content: unknown
    game: GameData
    setModal: Dispatch<SetStateAction<string | null>>
    formatId: unknown
}

export const FinishTemplate = ({ title, content, game, setModal, formatId }: FinishTemplateProps) => {

    const { changeScreen } = useContext(MainContext)
    const [resetModalVisible, setResetModalVisible] = useState(false)

    return (
        <div className={gameStyle.finishContainer}>
            <GameTitle
                title={title}
                description="Финиш!"
                setModal={setModal}
            />

            <div className={gameStyle.playTemplateProgressContainer}>
                <ProgressBar
                    game={game}
                    setModal={setModal}
                />
            </div>

            {formatId === 2 ? (
                <FinishTour
                    text={content}
                    game={game}
                    setResetModalVisible={setResetModalVisible}
                />
            ) : (
                <FinishQuest
                    text={content}
                    game={game}
                    setModal={setModal}
                    setResetModalVisible={setResetModalVisible}
                />
            )}

            <div className={mainStyle.mt30}>
                <div className={`${mainStyle.subtitle} ${mainStyle.textCenter} ${mainStyle.mb20}`}>
                    {formatId === 2
                        ? `Еще туры в г. ${game.quest_city}`
                        : `Еще туры в г. ${game.quest_city}`}
                </div>

                <Quests cityId={game.quest_city_id as number} />
            </div>

            <ResetModal
                modalVisible={resetModalVisible}
                setModalVisible={setResetModalVisible}
                onSuccess={() => {
                    changeScreen(QUEST_SCREEN)
                }}
            />
        </div>
    )
}
