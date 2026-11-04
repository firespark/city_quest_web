import mainStyle from '../../styles/mainStyle.module.css'

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IoCheckmarkSharp, IoLocationSharp } from 'react-icons/io5'

import questsStyle from '../../styles/questsStyle.module.css'

import { slugUrl } from '../../routes'

type PurchasedQuestData = {
    id: number
    slug: string
    [key: string]: unknown
}

export const PurchasedQuest = ({ quest }: { quest: PurchasedQuestData }) => {

    return (
        <Link
            to={slugUrl(quest.slug)}
            className={questsStyle.itemWrapper}
        >
            <div className={questsStyle.imageContainer}>
                <img
                    src={quest.image as string}
                    className={questsStyle.questImage}
                    alt=""
                />

                <div className={questsStyle.badgeAccessWrapper}>
                    <div className={`${questsStyle.microBadge} ${mainStyle.bgGreen}`}>
                        <span className={questsStyle.microBadgeText}>
                            <IoCheckmarkSharp size={12} className={mainStyle.textWhite} />
                        </span>
                    </div>
                </div>
            </div>

            <div className={questsStyle.contentBlock}>
                <div className={`${questsStyle.compactQuestTitle} ${mainStyle.heading}`}>
                    {quest.title as ReactNode}
                </div>

                <div className={mainStyle.panelRowLeft}>
                    <IoLocationSharp size={14} className={mainStyle.blue} />

                    <span className={`${questsStyle.city} ${questsStyle.questCityCaption}`}>
                        {quest.city as ReactNode}
                    </span>
                </div>
            </div>
        </Link>
    )
}
