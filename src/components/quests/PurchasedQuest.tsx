
import { useContext, type ReactNode } from 'react'
import { IoCheckmarkSharp, IoLocationSharp } from 'react-icons/io5'

import questsStyle from '../../styles/questsStyle.module.css'

import { QUEST_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

type PurchasedQuestData = {
    id: number
    [key: string]: unknown
}

export const PurchasedQuest = ({ quest }: { quest: PurchasedQuestData }) => {

    const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext)

    return (
        <button
            type="button"
            className={questsStyle.itemWrapper}
            onClick={() => {
                changeScreen(QUEST_SCREEN)
                setQuestId(quest.id)
                questScreenCleanup()
            }}
        >
            <div className={questsStyle.imageContainer}>
                <img
                    src={quest.image as string}
                    className={questsStyle.questImage}
                    alt=""
                />

                <div className={questsStyle.badgeAccessWrapper}>
                    <div className={`${questsStyle.microBadge} ${questsStyle.badgeSuccess}`}>
                        <span className={questsStyle.microBadgeText}>
                            <IoCheckmarkSharp size={12} color="#FFFFFF" />
                        </span>
                    </div>
                </div>
            </div>

            <div className={questsStyle.contentBlock}>
                <div className={questsStyle.title}>
                    {quest.title as ReactNode}
                </div>

                <div className={questsStyle.locationContainer}>
                    <IoLocationSharp size={14} color="#17A2B8" />

                    <span className={`${questsStyle.city} ${questsStyle.cityText}`}>
                        {quest.city as ReactNode}
                    </span>
                </div>
            </div>
        </button>
    )
}
