
import { useContext } from 'react'

import profileStyle from '../../styles/profileStyle.module.css'

import { MainContext } from '../../context/mainContext'
import { MAIN_SCREEN } from '../../context/types'

export const Logout = () => {

    const { resetToken, changeScreen } = useContext(MainContext)

    return (
        <button
            type="button"
            className={profileStyle.logoutButton}
            onClick={() => {
                changeScreen(MAIN_SCREEN)
                resetToken()
            }}
        >
            <span className={profileStyle.logoutText}>
                Выйти из аккаунта
            </span>
        </button>
    )
}
