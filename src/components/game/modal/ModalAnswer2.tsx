
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
        <div className={mainStyle.mt5}>

            <div className={mainStyle.card}>
                <div className={`${gameStyle.gameSuccessTitle} ${mainStyle.mt10}`}>
                    ВЕРНО!
                </div>

                <div className={`${gameStyle.answerTitle} ${mainStyle.mb10}`}>
                    {answer2 as ReactNode}
                </div>
            </div>

            <div className={mainStyle.mt15}>
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

            <div className={`${mainStyle.textCenter} ${mainStyle.mt20}`}>
                <button
                    type="button"
                    className={gameStyle.answerBackButton}
                    onClick={() => {
                        setModal(null)
                    }}
                >
                    <span className={`${gameStyle.gameLinkText} ${mainStyle.textCenter}`}>
                        Вернуться на предыдущий экран
                    </span>
                </button>
            </div>
        </div>
    )
}
