import { useContext } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

import { MainContext } from '../../context/mainContext'
import { MAIN_SCREEN } from '../../context/types'

export const Logout = () => {

    const { resetToken, changeScreen } = useContext(MainContext)

    return (
        <button
            type="button"
            className={`${mainStyle.siteButton} ${mainStyle.siteButtonDanger}`}
            onClick={() => {
                changeScreen(MAIN_SCREEN)
                resetToken()
            }}
        >
            Выйти из аккаунта
        </button>
    )
}