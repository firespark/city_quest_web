
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import headerStyle from '../../styles/headerStyle.module.css'

import closeImage from '../../../assets/img/close.png'

type TemplateCloseProps = {
    setTemplate: Dispatch<SetStateAction<string | null>>
}

export const TemplateClose = ({ setTemplate }: TemplateCloseProps) => {

    return (
        <button
            type="button"
            className={mainStyle.plainButton}
            aria-label="Закрыть"
            onClick={() => {
                setTemplate(null)
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
