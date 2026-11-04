
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

type ModalAnswer2Props = {
    answer2: unknown
    setModal: Dispatch<SetStateAction<string | null>>
    nextGame: () => Promise<void>
}

export const ModalAnswer2 = ({ answer2, setModal, nextGame }: ModalAnswer2Props) => {
    return (
        <div className={mainStyle.mt8}>

            <div className={mainStyle.card}>
                <div className={`${gameStyle.gameSuccessTitle} ${mainStyle.mt12} ${mainStyle.heading}`}>
                    ВЕРНО!
                </div>

                <div className={`${gameStyle.answerTitle} ${mainStyle.mb12} ${mainStyle.heading}`}>
                    {answer2 as ReactNode}
                </div>
            </div>

            <div className={mainStyle.mt16}>
                <button
                    type="button"
                    className={mainStyle.primaryButton}
                    onClick={() => {
                        nextGame()
                        setModal(null)
                    }}
                >
                    <span className={mainStyle.primaryButtonText}>
                        Продолжить
                    </span>
                </button>
            </div>

            <div className={`${mainStyle.textCenter} ${mainStyle.mt24}`}>
                <button
                    type="button"
                    className={mainStyle.plainButton}
                    onClick={() => {
                        setModal(null)
                    }}
                >
                    <span className={`${mainStyle.link} ${mainStyle.textCenter}`}>
                        Вернуться на предыдущий экран
                    </span>
                </button>
            </div>
        </div>
    )
}
