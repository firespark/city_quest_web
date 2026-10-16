
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import { ROUTES } from '../../routes'

export const PasswordForgot = () => {

    return (
        <div className={`${mainStyle.center} ${mainStyle.mt30}`}>
            <Link
                to={ROUTES.PASSWORD_RESET}
                className={mainStyle.plainButton}
            >
                <span className={mainStyle.link}>
                    Не помню пароль
                </span>
            </Link>
        </div>
    )
}
