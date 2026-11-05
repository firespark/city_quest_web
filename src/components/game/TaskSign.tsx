
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

import questionImage from '../../assets/img/question2.png'
import questionDisabledImage from '../../assets/img/question2-disabled.png'

type TaskSignProps = {
    number: string
    setModal?: Dispatch<SetStateAction<string | null>>
    disabled?: boolean
}

export const TaskSign = ({ number, setModal, disabled }: TaskSignProps) => {
    return (
        <div className={gameStyle.taskSignWrapper}>
            {disabled ? (
                <div className={`${gameStyle.pill} ${gameStyle.pillDisabled}`}>
                    <img
                        src={questionDisabledImage}
                        className={gameStyle.pillIcon}
                        alt={`Изображение значка «Задание ${number}»`}
                        aria-hidden="true"
                    />
                    <span className={`${mainStyle.textBlue} ${mainStyle.textMuted}`}>
                        Задание {number}
                    </span>
                </div>
            ) : (
                <button
                    type="button"
                    className={mainStyle.plainButton}
                    onClick={() => {
                        setModal?.(`task${number}`)
                    }}
                >
                    <span className={`${gameStyle.pill} ${mainStyle.radioCardActive}`}>
                        <img
                            src={questionImage}
                            className={gameStyle.pillIcon}
                            alt={`Изображение значка «Задание ${number}»`}
                            aria-hidden="true"
                        />
                        <span className={mainStyle.textBlue}>
                            Задание {number}
                        </span>
                    </span>
                </button>
            )}
        </div>
    )
}
