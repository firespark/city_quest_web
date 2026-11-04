
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'


type GameTitleProps = {
    title: unknown
    description: string
    setModal: Dispatch<SetStateAction<string | null>>
}

export const GameTitle = ({ title, description, setModal }: GameTitleProps) => {
    return (
        <div className={mainStyle.wrapper}>
            <h1>{title as ReactNode}</h1>

            <button
                type="button"
                className={mainStyle.plainButton}
                onClick={() => setModal('progress')}
            >
                <span className={mainStyle.badge}>
                    <span className={`${mainStyle.badgeText} ${mainStyle.textCenter}`}>
                        {description}
                    </span>
                </span>
            </button>
        </div>
    )
}
