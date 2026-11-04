import { imageAlt } from '../../../scripts/imageAlt'

import mainStyle from "../../../styles/mainStyle.module.css"
import questDetailStyle from '../../../styles/questDetailStyle.module.css'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'
import { Link } from 'react-router-dom'
import { slugUrl } from '../../../routes'

import { TelegramButton } from '../TelegramButton'
import { ComingSoonBadge } from '../QuestBadges'

type ComingSoonHeroProps = {
    title: string
    city: string
    citySlug: string
    image: string
    bannerIcon?: string | null
}

export const ComingSoonHero = ({
    title,
    city,
    citySlug,
    image,
    bannerIcon
}: ComingSoonHeroProps) => {

    return (
        <section
            className={questDetailStyle.questHero}
            aria-label={title}
        >
            <img
                src={image}
                alt={imageAlt('квеста', title)}
                className={`${mainStyle.coverImage} ${questDetailStyle.questHeroImage}`}
            />

            <div
                className={questDetailStyle.questHeroShade}
                aria-hidden="true"
            />

            <div className={`${questDetailStyle.questHeroContent} ${questDetailStyle.heroContent}`}>

                <ComingSoonBadge />

                <Link to={slugUrl(citySlug)} className={questDetailStyle.questHeroCity}>
                    {city}
                </Link>

                <h1>{title}</h1>

                <div className={comingSoonStyle.heroSubtitle}>Городской квест о пушистых жителях Тбилиси.</div>

                {import.meta.env.VITE_TELEGRAM_BOT_URL?.trim() && (
                    <div className={questDetailStyle.questHeroAction}>
                        <TelegramButton>
                            Записаться через Telegram
                        </TelegramButton>
                    </div>
                )}

                {bannerIcon && (
                    <img
                        src={bannerIcon}
                        alt={imageAlt('значка квеста', title)}
                        aria-hidden="true"
                        className={comingSoonStyle.heroIcon}
                    />
                )}

            </div>
        </section>
    )
}
