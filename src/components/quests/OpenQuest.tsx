
import { useContext, type ReactNode } from 'react'
import { IoLockClosed, IoCheckmarkSharp, IoLocationSharp } from 'react-icons/io5'

import questsStyle from '../../styles/questsStyle.module.css'

import { QUEST_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

type OpenQuestData = {
    id?: number | string
    [key: string]: unknown
}

export const OpenQuest = ({ quest }: { quest: OpenQuestData }) => {

    const { changeScreen, setQuestId, questScreenCleanup } = useContext(MainContext)

    const renderAccessBadge = () => {
        if (quest.paid && !quest.available) {
            return (
                <div className={`${questsStyle.microBadge} ${questsStyle.badgeLocked}`}>
                    <span className={questsStyle.microBadgeText}>
                        <IoLockClosed size={12} color="#FFFFFF" />
                    </span>
                </div>
            )
        }

        if (quest.paid && quest.available) {
            return (
                <div className={`${questsStyle.microBadge} ${questsStyle.badgeSuccess}`}>
                    <span className={questsStyle.microBadgeText}>
                        <IoCheckmarkSharp size={12} color="#FFFFFF" />
                    </span>
                </div>
            )
        }

        return null
    }

    return (
        <button
            type="button"
            className={questsStyle.itemWrapper}
            onClick={() => {
                changeScreen(QUEST_SCREEN)
                setQuestId(quest.id as number)
                questScreenCleanup()
            }}
        >
            <div className={questsStyle.imageContainer}>
                <img
                    src={quest.quest_image as string}
                    className={questsStyle.questImage}
                    alt=""
                />

                <div className={questsStyle.badgeAccessWrapper}>
                    {renderAccessBadge()}
                </div>
            </div>

            <div className={questsStyle.contentBlock}>
                <div className={questsStyle.title}>
                    {quest.quest_title as ReactNode}
                </div>

                <div className={questsStyle.locationContainer}>
                    <IoLocationSharp size={14} color="#17A2B8" />

                    <span className={`${questsStyle.city} ${questsStyle.cityText}`}>
                        {quest.city as ReactNode}
                    </span>
                </div>

                <div className={questsStyle.divider} />

                <div className={questsStyle.progressRow}>
                    <span className={questsStyle.progressText}>
                        Уровень {quest.step as ReactNode} из {quest.levels as ReactNode}
                    </span>
                </div>
            </div>
        </button>
    )
}
