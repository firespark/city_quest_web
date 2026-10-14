
import { useContext } from 'react'
import { IoLibrary } from 'react-icons/io5'

import { StatusBadge, AccessBadge } from './QuestBadges'

import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

import { QUEST_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export type QuestData = {
    id: number
    image: string
    paid: unknown
    available: unknown
    status: string | null
    title: string
    sights_count: number | string
}

export const Quest = ({ quest }: { quest: QuestData }) => {
    const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext)

    return (
        <button
            type="button"
            className={questsStyle.questCardWrapper}
            onClick={() => {
                changeScreen(QUEST_SCREEN)
                setQuestId(quest.id)
                questScreenCleanup()
            }}
        >
            <div className={questsStyle.questImagePadding}>
                <div className={questsStyle.questImageContainer}>
                    <img
                        src={quest.image}
                        className={questsStyle.questCardImage}
                        alt=""
                    />

                    <div className={questsStyle.questBadgeOverlay}>
                        <div>
                            <AccessBadge paid={quest.paid} available={quest.available} />
                        </div>

                        <div>
                            <StatusBadge status={quest.status} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={questsStyle.questInfoContainer}>
                <div className={questsStyle.questMainTextContent}>
                    <div className={questsStyle.questTitle}>
                        {quest.title}
                    </div>

                    <div className={questsStyle.questStatRow}>
                        <div className={questsStyle.questIconCircle}>
                            <IoLibrary size={20} color="#17A2B8" />
                        </div>

                        <div className={questsStyle.questTextContainer}>
                            <span className={questsStyle.questLabel}>
                                Локаций: {quest.sights_count}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={mainStyle.arrowContainer}>
                    <span className={mainStyle.pureArrow}>→</span>
                </div>
            </div>
        </button>
    )
}
