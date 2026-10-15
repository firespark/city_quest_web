
import { useContext } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

import { AUTH_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export const ProfileRegister = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <div className={profileStyle.profileContainer}>
            <div className={mainStyle.mb15}>
                <div className={mainStyle.description}>
                    Хочешь сохранять результаты своих игр?
                </div>
            </div>

            <button
                type="button"
                className={mainStyle.primaryButton}
                onClick={() => changeScreen(AUTH_SCREEN)}
            >
                <span className={mainStyle.primaryButtonText}>
                    Войти / Зарегистрироваться
                </span>
            </button>
        </div>
    )
}
