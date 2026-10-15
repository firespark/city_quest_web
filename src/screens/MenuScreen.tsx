
import mainStyle from '../styles/mainStyle.module.css'
import headerStyle from '../styles/headerStyle.module.css'

import { Close } from '../components/common/Close'
import { MenuItems } from '../components/common/MenuItems'
import { Footer } from '../components/common/Footer'

export const MenuScreen = () => {

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <header className={`${mainStyle.panelRowRight} ${headerStyle.panelHeader}`}>
                <Close />
            </header>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.container}>
                    <MenuItems />
                </div>
            </main>

            <Footer />
        </div>
    )
}
