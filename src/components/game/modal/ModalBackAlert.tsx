
import { useContext, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { MainContext } from '../../../context/mainContext'

type ModalBackAlertProps = {
    setModal: Dispatch<SetStateAction<string | null>>
}

export const ModalBackAlert = ({ setModal }: ModalBackAlertProps) => {

    const { previousScreen } = useContext(MainContext)

    return (
        <div className={mainStyle.container}>
            <div className={mainStyle.titleMain}>
                Ты хочешь выйти из игры?
            </div>

            <div className={gameStyle.gameActions}>
                <button
                    type="button"
                    className={mainStyle.dangerButton}
                    onClick={() => {
                        previousScreen()
                    }}
                >
                    <span className={mainStyle.dangerButtonText}>
                        Выйти
                    </span>
                </button>

                <button
                    type="button"
                    className={gameStyle.gameCancelLink}
                    onClick={() => setModal(null)}
                >
                    <span className={gameStyle.gameLinkText}>
                        Остаться
                    </span>
                </button>
            </div>
        </div>
    )
}
