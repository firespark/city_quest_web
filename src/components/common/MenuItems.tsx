import mainStyle from '../../styles/mainStyle.module.css'

import { useContext } from 'react'
import { Link } from 'react-router-dom'

import headerStyle from '../../styles/headerStyle.module.css'

import { ROUTES } from '../../routes'
import { CONTACTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

import infoImage from '../../assets/img/info.png'
import questionImage from '../../assets/img/question.png'
import envelopeImage from '../../assets/img/envelope.png'

export const MenuItems = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <div className={headerStyle.menuContainer}>

            <Link
                to={ROUTES.ABOUT}
                className={headerStyle.menuButtonPanel}
            >
                <div className={mainStyle.panelRowLeft}>
                    <div className={headerStyle.iconWrapper}>
                        <img
                            src={infoImage}
                            className={mainStyle.controlIcon}
                            alt="Изображение значка «О проекте»"
                            aria-hidden="true"
                        />
                    </div>

                    <span className={headerStyle.menuButtonText}>
                        О проекте
                    </span>
                </div>

                <span className={headerStyle.chevron}>›</span>
            </Link>

            <Link
                to={ROUTES.HOW_PLAY}
                className={headerStyle.menuButtonPanel}
            >
                <div className={mainStyle.panelRowLeft}>
                    <div className={headerStyle.iconWrapper}>
                        <img
                            src={questionImage}
                            className={mainStyle.controlIcon}
                            alt="Изображение значка «Как играть»"
                            aria-hidden="true"
                        />
                    </div>

                    <span className={headerStyle.menuButtonText}>
                        Как играть
                    </span>
                </div>

                <span className={headerStyle.chevron}>›</span>
            </Link>


            <Link
                to={ROUTES.CONTACTS}
                className={headerStyle.menuButtonPanel}
            >
                <div className={mainStyle.panelRowLeft}>
                    <div className={headerStyle.iconWrapper}>
                        <img
                            src={envelopeImage}
                            className={mainStyle.controlIcon}
                            alt="Изображение значка «Контакты»"
                            aria-hidden="true"
                        />
                    </div>
                    <span className={headerStyle.menuButtonText}>
                        Контакты
                    </span>
                </div>
                <span className={headerStyle.chevron}>›</span>
            </Link>


        </div>
    )
}
