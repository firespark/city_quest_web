import { imageAlt } from '../../../scripts/imageAlt'

import mainStyle from "../../../styles/mainStyle.module.css"

import { Link } from 'react-router-dom'
import { slugUrl } from '../../../routes'

import questDetailStyle from '../../../styles/questDetailStyle.module.css'

import { AccessBadge, StatusBadge } from '../QuestBadges'
import { QuestAppAction } from './QuestAppAction'


type QuestImageDetailProps = {
    image: string
    city: string
    citySlug: string
    title: string
    slug: string
    paid: boolean
    available: boolean
    status: 'finished' | 'in_progress' | null
}


export const QuestImageDetail = ({
    image,
    city,
    citySlug,
    title,
    slug,
    paid,
    available,
    status
}: QuestImageDetailProps) => {

    return (
        <section
            className={questDetailStyle.questHero}
            aria-label={title}
        >
            <img
                className={`${mainStyle.coverImage} ${questDetailStyle.questHeroImage}`}
                src={image}
                alt={imageAlt('квеста', title)}
            />

            <div
                className={questDetailStyle.questHeroShade}
                aria-hidden="true"
            />

            <div className={`${questDetailStyle.questHeroContent} ${questDetailStyle.heroContent}`}>

                {(paid || status) && (
                    <div className={questDetailStyle.badges}>
                        <AccessBadge
                            paid={paid}
                            available={available}
                        />

                        <StatusBadge status={status} />
                    </div>
                )}

                <Link to={slugUrl(citySlug)} className={questDetailStyle.questHeroCity}>
                    {city}
                </Link>

                <h1>{title}</h1>

                <div className={questDetailStyle.questHeroAction}>
                    <QuestAppAction slug={slug} paid={paid} available={available} />
                </div>

            </div>
        </section>
    )
}
