
import { useEffect, useId, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../routes'
import headerStyle from '../../styles/headerStyle.module.css'

export const HeaderMenu = () => {
    const menuId = useId()
    const menuRef = useRef<HTMLElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 761px)')
        const closeOnDesktop = () => {
            if (desktop.matches) menuRef.current?.hidePopover()
        }
        desktop.addEventListener('change', closeOnDesktop)
        return () => desktop.removeEventListener('change', closeOnDesktop)
    }, [])

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
                popoverTarget={menuId}
                aria-controls={menuId}
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
                <span className={headerStyle.menuIconContainer} aria-hidden="true">
                    <span className={`${headerStyle.menuLine} ${headerStyle.menuLine1}`} />
                    <span className={`${headerStyle.menuLine} ${headerStyle.menuLine2}`} />
                    <span className={`${headerStyle.menuLine} ${headerStyle.menuLine3}`} />
                </span>
            </button>

            <nav
                ref={menuRef}
                id={menuId}
                popover="auto"
                className={headerStyle.mobileDrawer}
                aria-label="Мобильная навигация"
                onToggle={event => setIsOpen(event.newState === 'open')}
            >
                <NavLink to={ROUTES.HOME} onClick={() => menuRef.current?.hidePopover()}>Главная</NavLink>
                <NavLink to={ROUTES.ABOUT} onClick={() => menuRef.current?.hidePopover()}>О проекте</NavLink>
                <NavLink to={ROUTES.HOW_PLAY} onClick={() => menuRef.current?.hidePopover()}>Как играть</NavLink>
                <NavLink to={ROUTES.CONTACTS} onClick={() => menuRef.current?.hidePopover()}>Контакты</NavLink>
                <NavLink to={ROUTES.PROFILE} onClick={() => menuRef.current?.hidePopover()}>Личный кабинет</NavLink>
            </nav>
        </>
    )
}
