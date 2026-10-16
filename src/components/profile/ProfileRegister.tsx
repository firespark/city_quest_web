
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

import { ROUTES } from '../../routes'

export const ProfileRegister = () => {

    return (
        <div className={profileStyle.profileContainer}>
            <div className={mainStyle.mb15}>
                <div className={mainStyle.description}>
                    Хочешь сохранять результаты своих игр?
                </div>
            </div>

            <Link
                to={ROUTES.AUTH}
                className={mainStyle.primaryButton}
            >
                <span className={mainStyle.primaryButtonText}>
                    Войти / Зарегистрироваться
                </span>
            </Link>
        </div>
    )
}
