
import { useContext } from 'react'

import { AUTH_SCREEN } from '../../context/types'
import mainStyle from '../../styles/mainStyle.module.css'
import { MainContext } from '../../context/mainContext'

export const RegisterButton = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <div className={mainStyle.center}>
            <div className={`${mainStyle.textCenter} ${mainStyle.mb20} ${mainStyle.textRed}`}>
                Чтобы приобрести этот квест-тур, необходимо авторизоваться.
                Иначе мы не сможем сохранить вашу покупку.
            </div>
            <button
                type="button"
                className={mainStyle.buttonBuy}
                onClick={() => changeScreen(AUTH_SCREEN)}
            >
                <span className={mainStyle.buttonText}>Авторизоваться</span>
            </button>
        </div>
    )
}
