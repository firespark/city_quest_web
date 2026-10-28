
import { IoPaperPlaneOutline } from 'react-icons/io5'

import { TelegramButton } from '../TelegramButton'

import style from '../../../styles/comingSoonStyle.module.css'

export const ComingSoonSignup2 = () => {

    if (!import.meta.env.VITE_TELEGRAM_BOT_URL?.trim()) {
        return null
    }

    return (
        <section className={`${style.signup} ${style.signupDark}`}>

            <div className={style.signupContent}>

                <div className={style.signupEyebrow}>
                    НЕ ПРОПУСТИТЕ ОТКРЫТИЕ
                </div>

                <h2 className={style.signupTitle}>
                    Запись через Telegram
                </h2>

                <p className={style.signupText}>
                    Узнай условия участия и запишись на квест через
                    нашего Telegram-бота.
                </p>

                <TelegramButton className={style.signupButtonDark}>
                    Открыть Telegram-бот
                </TelegramButton>

            </div>

            <div className={style.signupArtwork} aria-hidden="true">
                <IoPaperPlaneOutline size={78} />
            </div>

        </section>
    )
}
