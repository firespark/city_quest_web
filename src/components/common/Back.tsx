
import { useContext } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

import { MainContext } from '../../context/mainContext'

import backImage from '../../../assets/img/back.png'

export const Back = () => {
    const { previousScreen } = useContext(MainContext)

    return (
        <button
            type="button"
            className={mainStyle.backButton}
            onClick={() => {
                previousScreen()
            }}
            aria-label="Назад"
        >
            <img
                src={backImage}
                className={mainStyle.backIcon}
                alt=""
            />
        </button>
    )
}
