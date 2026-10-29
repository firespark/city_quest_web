
import { Link } from 'react-router-dom'

import { ROUTES } from '../../routes'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

export const ProfileRegister = () => {

    return (
        <section className={profileStyle.guestNotice}>

            <p className={profileStyle.guestText}>
                Хочешь сохранять результаты своих игр?
            </p>

            <Link
                to={ROUTES.AUTH}
                className={mainStyle.siteButton}
            >
                Войти / Зарегистрироваться
            </Link>

        </section>
    )
}
