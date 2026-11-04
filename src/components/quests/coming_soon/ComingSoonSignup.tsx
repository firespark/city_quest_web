import questsStyle from '../../../styles/questsStyle.module.css'
import mainStyle from '../../../styles/mainStyle.module.css'

import { IoPaperPlaneOutline } from 'react-icons/io5'

import { TelegramButton } from '../TelegramButton'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

export const ComingSoonSignup = () => {

    const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL?.trim()

    if (!telegramBotUrl) return null

    return (
        <div className={`${comingSoonStyle.signup} ${comingSoonStyle.signupLight}`}>

            <div className={comingSoonStyle.signupContent}>

                <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                    УЧАСТИЕ
                </div>

                <div className={comingSoonStyle.panelTitle}>Как записаться?</div>

                <div className={`${mainStyle.bodyText} ${mainStyle.mb24}`}>Запишись на квест через Телеграм-бота.</div>

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

        </div>
    )
}
