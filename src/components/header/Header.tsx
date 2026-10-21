
import { Logo } from '../common/Logo'

import { HeaderMenu } from './HeaderMenu'
import { HeaderProfile } from './HeaderProfile'

import headerStyle from '../../styles/headerStyle.module.css'

export const Header = () => {
    return (
        <header className={headerStyle.panelHeader}>
            <Logo />
            <HeaderMenu />
            <HeaderProfile />
        </header>
    )
}
