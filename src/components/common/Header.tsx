
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { Logo } from './Logo'
import { Menu } from './Menu'
import { Close } from './Close'

import { MainContext } from '../../context/mainContext'
import { MENU_SCREEN } from '../../context/types'
import { ROUTES } from '../../routes'

import headerStyle from '../../styles/headerStyle.module.css'
import userBlue from '../../../assets/img/user-blue.png'

export const Header = () => {
    const { screens } = useContext(MainContext)
    const isMenuOpen = screens[screens.length - 1] === MENU_SCREEN

    return (
        <header className={headerStyle.panelHeader}>
            <Logo />

            <nav className={headerStyle.headerNav}>
                <NavLink to={ROUTES.ABOUT}>О проекте</NavLink>
                <NavLink to={ROUTES.HOW_PLAY}>Как играть</NavLink>
                <NavLink to={ROUTES.CONTACTS}>Контакты</NavLink>
            </nav>

            <div className={headerStyle.headerMobileMenu}>
                {isMenuOpen ? <Close /> : <Menu />}
            </div>

            <Link
                to={ROUTES.AUTH}
                className={headerStyle.headerLogin}
                aria-label="Войти"
                title="Войти"
            >
                <img src={userBlue} alt="" />
            </Link>
        </header>
    )
}
