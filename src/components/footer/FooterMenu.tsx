
import { Link } from 'react-router-dom'

import { ROUTES } from '../../routes'
import footerStyle from '../../styles/footerStyle.module.css'

export const FooterMenu = () => {
    return (
        <div className={footerStyle.footerInformation}>
            <h2 className={footerStyle.footerTitle}>
                Информация
            </h2>

            <nav
                className={footerStyle.footerLinks}
                aria-label="Информация о проекте"
            >
                <Link to={ROUTES.ABOUT}>
                    О проекте
                </Link>

                <Link to={ROUTES.HOW_PLAY}>
                    Как играть
                </Link>

                <Link to={ROUTES.CONTACTS}>
                    Контакты
                </Link>

                <span>
                    Пользовательское соглашение
                </span>

                <span>
                    Политика конфиденциальности
                </span>
            </nav>
        </div>
    )
}
