
import { Link } from 'react-router-dom'
import { IoPersonOutline } from 'react-icons/io5'

import { ROUTES } from '../../routes'
import headerStyle from '../../styles/headerStyle.module.css'

export const HeaderProfile = () => {
    return (
        <Link
            to={ROUTES.PROFILE}
            className={headerStyle.headerLogin}
            aria-label="Личный кабинет"
            title="Личный кабинет"
        >
            <IoPersonOutline size={24} aria-hidden="true" />
        </Link>
    )
}
