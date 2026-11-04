import { imageAlt } from '../../scripts/imageAlt'


import { IoLibrary } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { slugUrl } from '../../routes'

import { StatusBadge, AccessBadge } from './QuestBadges'

import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

export type QuestData = {
    id: number
    image: string
    paid: unknown
    available: unknown
    status: string | null
    title: string
    sights_count: number | string
    slug: string
}

export const Quest = ({ quest }: { quest: QuestData }) => {

    return (

        <Link
            to={slugUrl(quest.slug)}
            className={questsStyle.questCardWrapper}
        >

            <div className={questsStyle.questImagePadding}>
                <div className={questsStyle.questImageContainer}>
                    <img
                        src={quest.image}
                        className={questsStyle.questCardImage}
                        alt={imageAlt('квеста', quest.title)}
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
                    <div className={`${questsStyle.questTitle} ${mainStyle.heading}`}>
                        {quest.title}
                    </div>

                    <div className={questsStyle.questStatRow}>
                        <div className={questsStyle.questIconCircle}>
                            <IoLibrary size={20} className={mainStyle.blue} />
                        </div>

                        <div className={mainStyle.textColumn}>
                            <span className={mainStyle.metaLabel}>
                                Локаций: {quest.sights_count}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={mainStyle.arrowContainer}>
                    <span className={mainStyle.pureArrow}>→</span>
                </div>
            </div>
        </Link>
    )
}
