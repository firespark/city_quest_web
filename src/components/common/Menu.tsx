
import { useContext } from 'react'
import headerStyle from '../../styles/headerStyle.module.css'

import { MENU_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export const Menu = () => {
    const { changeScreen } = useContext(MainContext)

    return (
        <button
            type="button"
            className={headerStyle.menuButton}
            onClick={() => {
                changeScreen(MENU_SCREEN)
            }}
            aria-label="Открыть меню"
        >
            <div className={headerStyle.menuIconContainer}>
                <div className={`${headerStyle.menuLine} ${headerStyle.menuLine1}`}></div>
                <div className={`${headerStyle.menuLine} ${headerStyle.menuLine2}`}></div>
                <div className={`${headerStyle.menuLine} ${headerStyle.menuLine3}`}></div>
            </div>
        </button>
    )
}
