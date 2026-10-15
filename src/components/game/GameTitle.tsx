
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

type GameTitleProps = {
    title: unknown
    description: string
    setModal: Dispatch<SetStateAction<string | null>>
}

export const GameTitle = ({ title, description, setModal }: GameTitleProps) => {
    return (
        <div className={mainStyle.wrapper}>
            <div className={mainStyle.titleMain}>
                {title as ReactNode}
            </div>

            <button
                type="button"
                className={mainStyle.plainButton}
                onClick={() => setModal('progress')}
            >
                <div className={mainStyle.badge}>
                    <span className={`${mainStyle.badgeText} ${mainStyle.textCenter}`}>
                        {description}
                    </span>
                </div>
            </button>
        </div>
    )
}
