
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { MainContext } from '../../context/mainContext'
import { MENU_SCREEN } from '../../context/types'
import { ROUTES } from '../../routes'
import headerStyle from '../../styles/headerStyle.module.css'

export const HeaderMenu = () => {
    const { changeScreen } = useContext(MainContext)

    return (
        <>
            <nav
                className={headerStyle.headerNav}
                aria-label="Основная навигация"
            >
                <NavLink to={ROUTES.ABOUT}>
                    О проекте
                </NavLink>

                <NavLink to={ROUTES.HOW_PLAY}>
                    Как играть
                </NavLink>

                <NavLink to={ROUTES.CONTACTS}>
                    Контакты
                </NavLink>
            </nav>

            <button
                type="button"
                className={`${headerStyle.menuButton} ${headerStyle.headerMobileMenu}`}
                onClick={() => changeScreen(MENU_SCREEN)}
                aria-label="Открыть меню"
            >
                <span className={headerStyle.menuIconContainer} aria-hidden="true">
                    <span className={`${headerStyle.menuLine} ${headerStyle.menuLine1}`} />
                    <span className={`${headerStyle.menuLine} ${headerStyle.menuLine2}`} />
                    <span className={`${headerStyle.menuLine} ${headerStyle.menuLine3}`} />
                </span>
            </button>
        </>
    )
}
