import mainStyle from '../../styles/mainStyle.module.css'

import { Logo } from '../common/Logo'

import footerStyle from '../../styles/footerStyle.module.css'

export const FooterDescription = () => {
    return (
        <div className={footerStyle.footerBrand}>
            <Logo />

            <p className={`${mainStyle.bodyText} ${footerStyle.footerDescription}`}>
                Городские квесты и необычные маршруты.
                Открывайте знакомые улицы заново.
            </p>
        </div>
    )
}
