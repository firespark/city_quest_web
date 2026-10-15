
import gameStyle from '../../../styles/gameStyle.module.css'

import closeImage from '../../../../assets/img/close.png'

type ModalCloseProps = {
    setModal: (value: null) => void
}

export const ModalClose = ({ setModal }: ModalCloseProps) => {
    return (
        <button
            type="button"
            className={gameStyle.closeButton}
            aria-label="Закрыть"
            onClick={() => {
                setModal(null)
            }}
        >
            <img
                src={closeImage}
                className={gameStyle.closeIcon}
                alt=""
            />
        </button>
    )
}
