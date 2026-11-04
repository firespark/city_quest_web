
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
            <div className={`${mainStyle.formTitle} ${mainStyle.textCenter} ${mainStyle.mb24} ${mainStyle.heading}`}>
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
