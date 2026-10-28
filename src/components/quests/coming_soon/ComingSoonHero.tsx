
import style from '../../../styles/comingSoonStyle.module.css'

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
            className={style.hero}
            aria-label={title}
        >
            <img
                src={image}
                alt=""
                className={style.heroImage}
            />

            <div
                className={style.heroShade}
                aria-hidden="true"
            />

            <div className={style.heroContent}>

                <span className={style.badge}>
                    Скоро
                </span>

                <div className={style.heroCity}>
                    {city}
                </div>

                <h1 className={style.heroTitle}>
                    {title}
                </h1>

                <p className={style.heroSubtitle}>
                    Городской квест о пушистых жителях Тбилиси.
                </p>

                {import.meta.env.VITE_TELEGRAM_BOT_URL?.trim() && (
                    <div className={style.heroAction}>
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
                        className={style.heroIcon}
                    />
                )}

            </div>
        </section>
    )
}
