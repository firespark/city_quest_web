import mainStyle from '../../styles/mainStyle.module.css'

import { Link } from 'react-router-dom'
import { IoArrowForward } from 'react-icons/io5'

import { slugUrl } from '../../routes'
import type { FeaturedQuestData } from './FeaturedQuests'
import { AccessBadge, StatusBadge } from './QuestBadges'

import questsStyle from '../../styles/questsStyle.module.css'

export const FeaturedCard = ({ quest }: { quest: FeaturedQuestData }) => {

    const content = (
        <>
            <div className={questsStyle.featuredImageWrapper}>
                <img
                    src={quest.image}
                    alt=""
                    loading="lazy"
                    className={mainStyle.interactiveImage}
                />

                <div className={questsStyle.questBadgeOverlay}>
                    <div>
                        <AccessBadge
                            paid={quest.paid}
                            available={quest.available}
                        />
                    </div>

                    <div>
                        <StatusBadge status={quest.status} />
                    </div>
                </div>
            </div>

            <div className={questsStyle.featuredBody}>
                {quest.city && (
                    quest.city_slug ? (
                        <Link to={slugUrl(quest.city_slug)} className={questsStyle.featuredCity}>
                            {quest.city}
                        </Link>
                    ) : <span className={questsStyle.featuredCity}>{quest.city}</span>
                )}

                <h3 className={questsStyle.featuredTitle}>
                    {quest.slug ? (
                        <Link to={slugUrl(quest.slug)} className={questsStyle.featuredQuestLink}>
                            {quest.title}
                        </Link>
                    ) : quest.title}
                </h3>

                <div className={questsStyle.featuredBottom}>
                    <span>
                        Локаций: {quest.sights_count}
                    </span>

                    {quest.slug && (
                        <span
                            className={questsStyle.featuredArrow}
                            aria-hidden="true"
                        >
                            <IoArrowForward size={24} />
                        </span>
                    )}
                </div>
            </div>
        </>
    )

    return (
        <article className={`${questsStyle.featuredCard} ${mainStyle.imageHover}`}>
            {content}
        </article>
    )
}
