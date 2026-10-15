
import { useContext } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import headerStyle from '../../styles/headerStyle.module.css'

import { MainContext } from '../../context/mainContext'

import closeImage from '../../../assets/img/close.png'

export const Close = () => {

    const { previousScreen } = useContext(MainContext)

    return (
        <button
            type="button"
            className={mainStyle.plainButton}
            aria-label="Закрыть"
            onClick={() => {
                previousScreen()
            }}
        >
            <img
                src={closeImage}
                className={headerStyle.close}
                alt=""
            />
        </button>
    )
}
