import questsStyle from '../../../styles/questsStyle.module.css'
import mainStyle from '../../../styles/mainStyle.module.css'

import { IoPaperPlaneOutline } from 'react-icons/io5'

import { TelegramButton } from '../TelegramButton'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

export const ComingSoonSignup2 = () => {

    const telegramBotUrl = import.meta.env.VITE_TELEGRAM_BOT_URL?.trim()

    if (!telegramBotUrl) return null

    return (
        <div className={`${comingSoonStyle.signup} ${comingSoonStyle.signupDark}`}>

            <div className={comingSoonStyle.signupContent}>

                <div className={`${questsStyle.eyebrow} ${mainStyle.textLight}`}>
                    НЕ ПРОПУСТИТЕ ОТКРЫТИЕ
                </div>

                <div className={comingSoonStyle.panelTitle}>Запись через Telegram</div>

                <div className={`${mainStyle.bodyText} ${mainStyle.mb24} ${mainStyle.textWhite}`}>Узнай условия участия и запишись на квест через нашего Telegram-бота.</div>

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

        </div>
    )
}
