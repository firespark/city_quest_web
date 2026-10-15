
import mainStyle from '../../styles/mainStyle.module.css'

import { PASSWORDRESET_SCREEN } from '../../context/types'

type PasswordForgotProps = {
    changeScreen: (screen: string) => void
}

export const PasswordForgot = ({ changeScreen }: PasswordForgotProps) => {

    return (
        <div className={`${mainStyle.center} ${mainStyle.mt30}`}>
            <button
                type="button"
                className={mainStyle.plainButton}
                onClick={() => changeScreen(PASSWORDRESET_SCREEN)}
            >
                <span className={mainStyle.link}>
                    Не помню пароль
                </span>
            </button>
        </div>
    )
}
