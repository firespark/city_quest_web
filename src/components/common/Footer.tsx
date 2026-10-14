
import { useContext } from 'react'
import footerStyle from '../../styles/footerStyle.module.css'

import { MAIN_SCREEN, HOWPLAY_SCREEN, PROFILE_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

import home from '../../../assets/img/home.png'
import homeBlue from '../../../assets/img/home-blue.png'
import question from '../../../assets/img/question.png'
import questionBlue from '../../../assets/img/question-blue.png'
import user from '../../../assets/img/user.png'
import userBlue from '../../../assets/img/user-blue.png'

export const Footer = ({ active }: { active?: string }) => {

    const { changeScreen } = useContext(MainContext)

    const imageHome = (active == 'home') ? homeBlue : home

    const imageQuestion = (active == 'question') ? questionBlue : question
    const imageProfile = (active == 'profile') ? userBlue : user

    const colorHome = (active == 'home') ? '#17A2B8' : '#BDC3C7'
    const colorQuestion = (active == 'question') ? '#17A2B8' : '#BDC3C7'
    const colorProfile = (active == 'profile') ? '#17A2B8' : '#BDC3C7'

    return (
        <footer className={footerStyle.footerPanel}>
            <button
                type="button"
                className={footerStyle.footerBlock}
                onClick={() => {
                    changeScreen(MAIN_SCREEN)
                }}
            >
                <img src={imageHome} className={footerStyle.footerIcon} alt="" />
                <span className={footerStyle.footerMenuText} style={{ color: colorHome }}>Главная</span>
            </button>

            <button
                type="button"
                className={footerStyle.footerBlock}
                onClick={() => {
                    changeScreen(HOWPLAY_SCREEN)
                }}
            >
                <img src={imageQuestion} className={footerStyle.footerIcon} alt="" />
                <span className={footerStyle.footerMenuText} style={{ color: colorQuestion }}>Как играть</span>
            </button>

            <button
                type="button"
                className={footerStyle.footerBlock}
                onClick={() => {
                    changeScreen(PROFILE_SCREEN)
                }}
            >
                <img src={imageProfile} className={footerStyle.footerIcon} alt="" />
                <span className={footerStyle.footerMenuText} style={{ color: colorProfile }}>Профиль</span>
            </button>
        </footer>
    )
}
