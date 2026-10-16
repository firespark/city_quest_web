
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import headerStyle from '../../styles/headerStyle.module.css'

import { ROUTES } from '../../routes'

import logoImage from '../../../assets/img/logo-fun-black.png'

export const Logo = () => {
    return (
        <Link
            to={ROUTES.HOME}
            className={`${mainStyle.panelRowLeft} ${headerStyle.logoLink}`}
        >
            <img
                src={logoImage}
                className={headerStyle.logoImage}
                alt=""
            />

            <span className={headerStyle.logoTitle}>
                Гагара Тур
            </span>
        </Link>
    )
}
