import { imageAlt } from '../../../scripts/imageAlt'

import mainStyle from "../../../styles/mainStyle.module.css"

import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { slugUrl } from '../../../routes'

import questDetailStyle from '../../../styles/questDetailStyle.module.css'

import { AccessBadge, StatusBadge } from '../QuestBadges'
import { StartButton } from '../StartButton'


type QuestImageDetailProps = {
    image: string
    city: string
    citySlug: string
    title: string
    paid: boolean
    available: boolean
    status: 'finished' | 'in_progress' | null
    progress: string
    changeScreen: ComponentProps<typeof StartButton>['changeScreen']
}


export const QuestImageDetail = ({
    image,
    city,
    citySlug,
    title,
    paid,
    available,
    status,
    progress,
    changeScreen
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

                {available && (
                    <div className={questDetailStyle.questHeroAction}>
                        <StartButton
                            changeScreen={changeScreen}
                            progress={progress}
                        />
                    </div>
                )}

            </div>
        </section>
    )
}
