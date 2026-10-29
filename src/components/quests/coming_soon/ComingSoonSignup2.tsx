
import { IoPaperPlaneOutline } from 'react-icons/io5'

import { TelegramButton } from '../TelegramButton'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

export const ComingSoonSignup2 = () => {

    const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL?.trim()

    if (!telegramBotUrl) return null

    return (
        <section className={`${comingSoonStyle.signup} ${comingSoonStyle.signupDark}`}>

            <div className={comingSoonStyle.signupContent}>

                <div className={comingSoonStyle.signupEyebrow}>
                    НЕ ПРОПУСТИТЕ ОТКРЫТИЕ
                </div>

                <h2 className={comingSoonStyle.signupTitle}>
                    Запись через Telegram
                </h2>

                <p className={comingSoonStyle.signupText}>
                    Узнай условия участия и запишись на квест через
                    нашего Telegram-бота.
                </p>

                <TelegramButton className={comingSoonStyle.signupButtonDark}>
                    Открыть Telegram-бот
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
