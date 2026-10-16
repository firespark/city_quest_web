
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'

import { ROUTES } from '../../routes'

export const RegisterButton = () => {

    return (
        <div className={mainStyle.center}>
            <div className={`${mainStyle.textCenter} ${mainStyle.mb20} ${mainStyle.textRed}`}>
                Чтобы приобрести этот квест-тур, необходимо авторизоваться.
                Иначе мы не сможем сохранить вашу покупку.
            </div>

            <Link
                to={ROUTES.AUTH}
                className={mainStyle.buttonBuy}
            >
                <span className={mainStyle.buttonText}>
                    Авторизоваться
                </span>
            </Link>
        </div>
    )
}
