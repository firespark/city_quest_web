
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

import backImage from '../../../assets/img/back.png'

type BackQuestProps = {
    setModal: Dispatch<SetStateAction<string | null>>
}

export const BackQuest = ({ setModal }: BackQuestProps) => {
    return (
        <button
            type="button"
            className={`${mainStyle.plainButton} ${gameStyle.gameBackButton}`}
            aria-label="Назад"
            onClick={() => {
                setModal('back')
            }}
        >
            <img
                src={backImage}
                className={gameStyle.gameBackIcon}
                alt=""
            />
        </button>
    )
}
