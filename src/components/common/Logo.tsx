
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import headerStyle from '../../styles/headerStyle.module.css'

import { ROUTES } from '../../routes'

export const Logo = () => {
    return (
        <Link
            to={ROUTES.HOME}
            className={`${mainStyle.panelRowLeft} ${headerStyle.logoLink}`}
        >
            <span
                className={headerStyle.logoImage}
                aria-hidden="true"
            />

            <span className={headerStyle.logoTitle}>
                Гагара Тур
            </span>
        </Link>
    )
}
