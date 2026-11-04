import { imageAlt } from '../../scripts/imageAlt'

import mainStyle from '../../styles/mainStyle.module.css'

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IoLockClosed, IoCheckmarkSharp, IoLocationSharp } from 'react-icons/io5'

import questsStyle from '../../styles/questsStyle.module.css'

import { slugUrl } from '../../routes'

type OpenQuestData = {
    id?: number | string
    slug: string
    [key: string]: unknown
}

export const OpenQuest = ({ quest }: { quest: OpenQuestData }) => {

    const renderAccessBadge = () => {
        if (quest.paid && !quest.available) {
            return (
                <div className={`${questsStyle.microBadge} ${mainStyle.bgRed}`}>
                    <span className={questsStyle.microBadgeText}>
                        <IoLockClosed size={12} className={mainStyle.textWhite} />
                    </span>
                </div>
            )
        }

        if (quest.paid && quest.available) {
            return (
                <div className={`${questsStyle.microBadge} ${mainStyle.bgGreen}`}>
                    <span className={questsStyle.microBadgeText}>
                        <IoCheckmarkSharp size={12} className={mainStyle.textWhite} />
                    </span>
                </div>
            )
        }

        return null
    }

    return (
        <Link
            to={slugUrl(quest.slug)}
            className={questsStyle.itemWrapper}
        >
            <div className={questsStyle.imageContainer}>
                <img
                    src={quest.quest_image as string}
                    className={questsStyle.questImage}
                    alt={imageAlt('квеста', quest.quest_title)}
                />

                <div className={questsStyle.badgeAccessWrapper}>
                    {renderAccessBadge()}
                </div>
            </div>

            <div className={questsStyle.contentBlock}>
                <div className={`${questsStyle.compactQuestTitle} ${mainStyle.heading}`}>
                    {quest.quest_title as ReactNode}
                </div>

                <div className={mainStyle.panelRowLeft}>
                    <IoLocationSharp size={14} className={mainStyle.blue} />

                    <span className={`${questsStyle.city} ${questsStyle.questCityCaption}`}>
                        {quest.city as ReactNode}
                    </span>
                </div>

                <div className={mainStyle.divider} />

                <div className={questsStyle.progressRow}>
                    <span className={questsStyle.progressText}>
                        Уровень {quest.step as ReactNode} из {quest.levels as ReactNode}
                    </span>
                </div>
            </div>
        </Link>
    )
}
