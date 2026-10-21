
import { Link } from 'react-router-dom'

import { ROUTES } from '../../routes'
import headerStyle from '../../styles/headerStyle.module.css'

import userBlue from '../../../assets/img/user-blue.png'

export const HeaderProfile = () => {
    return (
        <Link
            to={ROUTES.AUTH}
            className={headerStyle.headerLogin}
            aria-label="Войти"
            title="Войти"
        >
            <img src={userBlue} alt="" />
        </Link>
    )
}
