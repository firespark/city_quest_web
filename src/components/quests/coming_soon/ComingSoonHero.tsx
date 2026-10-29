
import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

import { TelegramButton } from '../TelegramButton'

type ComingSoonHeroProps = {
    title: string
    city: string
    image: string
    bannerIcon?: string | null
}

export const ComingSoonHero = ({
    title,
    city,
    image,
    bannerIcon
}: ComingSoonHeroProps) => {

    return (
        <section
            className={comingSoonStyle.hero}
            aria-label={title}
        >
            <img
                src={image}
                alt=""
                className={comingSoonStyle.heroImage}
            />

            <div
                className={comingSoonStyle.heroShade}
                aria-hidden="true"
            />

            <div className={comingSoonStyle.heroContent}>

                <span className={comingSoonStyle.badge}>
                    Скоро
                </span>

                <div className={comingSoonStyle.heroCity}>
                    {city}
                </div>

                <h1 className={comingSoonStyle.heroTitle}>
                    {title}
                </h1>

                <p className={comingSoonStyle.heroSubtitle}>
                    Городской квест о пушистых жителях Тбилиси.
                </p>

                {import.meta.env.VITE_TELEGRAM_BOT_URL?.trim() && (
                    <div className={comingSoonStyle.heroAction}>
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
