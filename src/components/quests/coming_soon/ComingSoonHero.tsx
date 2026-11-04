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
                alt=""
                className={`${mainStyle.coverImage} ${questDetailStyle.questHeroImage}`}
            />

            <div
                className={questDetailStyle.questHeroShade}
                aria-hidden="true"
            />

            <div className={questDetailStyle.questHeroContent}>

                <ComingSoonBadge />

                <Link to={slugUrl(citySlug)} className={questDetailStyle.questHeroCity}>
                    {city}
                </Link>

                <h1 className={questDetailStyle.heroTitle}>
                    {title}
                </h1>

                <p className={comingSoonStyle.heroSubtitle}>
                    Городской квест о пушистых жителях Тбилиси.
                </p>

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
                        alt=""
                        aria-hidden="true"
                        className={comingSoonStyle.heroIcon}
                    />
                )}

            </div>
        </section>
    )
}
