
import { Link } from 'react-router-dom'

import { slugUrl } from '../../routes'
import type { FeaturedQuestData } from './FeaturedQuests'

import questsStyle from '../../styles/questsStyle.module.css'

export const FeaturedCard = ({ quest }: { quest: FeaturedQuestData }) => {

    const content = (
        <>

            <div className={questsStyle.featuredImageWrapper}>
                <img
                    src={quest.image}
                    alt=""
                    loading="lazy"
                    className={questsStyle.featuredImage}
                />
            </div>


            <div className={questsStyle.featuredBody}>
                {quest.city && (
                    <span className={questsStyle.featuredCity}>
                        {quest.city}
                    </span>
                )}

                <h3 className={questsStyle.featuredTitle}>
                    {quest.title}
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
                            ↗
                        </span>
                    )}
                </div>
            </div>
        </>
    )

    return quest.slug ? (
        <Link
            to={slugUrl(quest.slug)}
            className={questsStyle.featuredCard}
        >
            {content}
        </Link>
    ) : (
        <div className={questsStyle.featuredCard}>
            {content}
        </div>
    )
}
