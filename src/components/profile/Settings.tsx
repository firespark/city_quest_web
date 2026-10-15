
import { useContext } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

import { PROFILESETTINGS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

import settingsImage from '../../../assets/img/settings.png'

export const Settings = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <button
            type="button"
            className={mainStyle.plainButton}
            aria-label="Настройки профиля"
            onClick={() => {
                changeScreen(PROFILESETTINGS_SCREEN)
            }}
        >
            <img
                src={settingsImage}
                className={profileStyle.settingsIcon}
                alt=""
            />
        </button>
    )
}
