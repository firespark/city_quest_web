
import { useContext } from 'react'
import { Link } from 'react-router-dom'

import headerStyle from '../../styles/headerStyle.module.css'

import { ROUTES } from '../../routes'
import { CONTACTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

import infoImage from '../../../assets/img/info.png'
import questionImage from '../../../assets/img/question.png'
import envelopeImage from '../../../assets/img/envelope.png'

export const MenuItems = () => {

    const { changeScreen } = useContext(MainContext)

    return (
        <div className={headerStyle.menuContainer}>

            <Link
                to={ROUTES.ABOUT}
                className={headerStyle.menuButtonPanel}
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
            </Link>

            <Link
                to={ROUTES.HOW_PLAY}
                className={headerStyle.menuButtonPanel}
            >
                <div className={headerStyle.leftContent}>
                    <div className={headerStyle.iconWrapper}>
                        <img
                            src={questionImage}
                            className={headerStyle.icon}
                            alt=""
                        />
                    </div>

                    <span className={headerStyle.buttonText}>
                        Как играть
                    </span>
                </div>

                <span className={headerStyle.chevron}>›</span>
            </Link>


            <Link
                to={ROUTES.CONTACTS}
                className={headerStyle.menuButtonPanel}
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
            </Link>


        </div>
    )
}
