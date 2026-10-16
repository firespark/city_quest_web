
import { Link } from 'react-router-dom'

import footerStyle from '../../styles/footerStyle.module.css'
import { ROUTES } from '../../routes'

import home from '../../../assets/img/home.png'
import homeBlue from '../../../assets/img/home-blue.png'
import question from '../../../assets/img/question.png'
import questionBlue from '../../../assets/img/question-blue.png'
import user from '../../../assets/img/user.png'
import userBlue from '../../../assets/img/user-blue.png'

export const Footer = ({ active }: { active?: string }) => {

    const imageHome = (active == 'home') ? homeBlue : home
    const imageQuestion = (active == 'question') ? questionBlue : question
    const imageProfile = (active == 'profile') ? userBlue : user

    const colorHome = (active == 'home') ? '#17A2B8' : '#BDC3C7'
    const colorQuestion = (active == 'question') ? '#17A2B8' : '#BDC3C7'
    const colorProfile = (active == 'profile') ? '#17A2B8' : '#BDC3C7'

    return (
        <footer className={footerStyle.footerPanel}>

            <Link
                to={ROUTES.HOME}
                className={footerStyle.footerBlock}
            >
                <img
                    src={imageHome}
                    className={footerStyle.footerIcon}
                    alt=""
                />

                <span
                    className={footerStyle.footerMenuText}
                    style={{ color: colorHome }}
                >
                    Главная
                </span>
            </Link>

            <Link
                to={ROUTES.HOW_PLAY}
                className={footerStyle.footerBlock}
            >
                <img
                    src={imageQuestion}
                    className={footerStyle.footerIcon}
                    alt=""
                />

                <span
                    className={footerStyle.footerMenuText}
                    style={{ color: colorQuestion }}
                >
                    Как играть
                </span>
            </Link>

            <Link
                to={ROUTES.PROFILE}
                className={footerStyle.footerBlock}
            >
                <img
                    src={imageProfile}
                    className={footerStyle.footerIcon}
                    alt=""
                />

                <span
                    className={footerStyle.footerMenuText}
                    style={{ color: colorProfile }}
                >
                    Профиль
                </span>
            </Link>

        </footer>
    )
}
