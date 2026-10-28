
import { IoPaperPlaneOutline } from 'react-icons/io5'

import { TelegramButton } from '../TelegramButton'

import style from '../../../styles/comingSoonStyle.module.css'

export const ComingSoonSignup = () => {

    if (!import.meta.env.VITE_TELEGRAM_BOT_URL?.trim()) {
        return null
    }

    return (
        <section className={`${style.signup} ${style.signupLight}`}>

            <div className={style.signupContent}>

                <div className={style.signupEyebrow}>
                    УЧАСТИЕ
                </div>

                <h2 className={style.signupTitle}>
                    Как записаться?
                </h2>

                <p className={style.signupText}>
                    Запишись на квест через Телеграм-бота.
                </p>

                <TelegramButton className={style.signupButtonLight}>
                    Записаться в Tg
                </TelegramButton>

            </div>

            <div className={style.signupArtwork} aria-hidden="true">
                <IoPaperPlaneOutline size={78} />
            </div>

        </section>
    )
}
