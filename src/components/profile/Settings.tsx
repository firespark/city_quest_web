
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

import { ROUTES } from '../../routes'

import settingsImage from '../../../assets/img/settings.png'

export const Settings = () => {

    return (
        <Link
            to={ROUTES.SETTINGS}
            className={mainStyle.plainButton}
            aria-label="Настройки профиля"
        >
            <img
                src={settingsImage}
                className={profileStyle.settingsIcon}
                alt=""
            />
        </Link>
    )
}
