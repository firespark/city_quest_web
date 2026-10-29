
import { IoPaperPlaneOutline } from 'react-icons/io5'

import { TelegramButton } from '../TelegramButton'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

export const ComingSoonSignup = () => {

    const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL?.trim()

    if (!telegramBotUrl) return null

    return (
        <section className={`${comingSoonStyle.signup} ${comingSoonStyle.signupLight}`}>

            <div className={comingSoonStyle.signupContent}>

                <div className={comingSoonStyle.signupEyebrow}>
                    УЧАСТИЕ
                </div>

                <h2 className={comingSoonStyle.signupTitle}>
                    Как записаться?
                </h2>

                <p className={comingSoonStyle.signupText}>
                    Запишись на квест через Телеграм-бота.
                </p>

                <TelegramButton className={comingSoonStyle.signupButtonLight}>
                    Записаться в Tg
                </TelegramButton>

            </div>

            <a
                href={telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={comingSoonStyle.signupArtwork}
                aria-label="Открыть Telegram-бота"
            >
                <IoPaperPlaneOutline size={78} aria-hidden="true" />
            </a>

        </section>
    )
}
