
import { useContext } from 'react'

import headerStyle from '../../styles/headerStyle.module.css'

import { ABOUT_SCREEN, CONTACTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

import infoImage from '../../../assets/img/info.png'
import envelopeImage from '../../../assets/img/envelope.png'

export const MenuItems = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <div className={headerStyle.menuContainer}>
            <button
                type="button"
                className={headerStyle.menuButtonPanel}
                onClick={() => changeScreen(ABOUT_SCREEN)}
            >
                <div className={headerStyle.leftContent}>
                    <div className={headerStyle.iconWrapper}>
                        <img
                            src={infoImage}
                            className={headerStyle.icon}
                            alt=""
                        />
                    </div>
                    <span className={headerStyle.buttonText}>
                        О проекте
                    </span>
                </div>
                <span className={headerStyle.chevron}>›</span>
            </button>

            <button
                type="button"
                className={headerStyle.menuButtonPanel}
                onClick={() => changeScreen(CONTACTS_SCREEN)}
            >
                <div className={headerStyle.leftContent}>
                    <div className={headerStyle.iconWrapper}>
                        <img
                            src={envelopeImage}
                            className={headerStyle.icon}
                            alt=""
                        />
                    </div>
                    <span className={headerStyle.buttonText}>
                        Контакты
                    </span>
                </div>
                <span className={headerStyle.chevron}>›</span>
            </button>
        </div>
    )
}
