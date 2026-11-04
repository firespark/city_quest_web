
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

type SightProps = {
    setModal: Dispatch<SetStateAction<string | null>>
    title: unknown
    image: unknown
}

export const Sight = ({ setModal, title, image }: SightProps) => {
    return (
        <div className={mainStyle.wrapper}>
            <button
                type="button"
                className={`${mainStyle.plainButton} ${gameStyle.sightTouchable}`}
                onClick={() => {
                    setModal('answer1')
                }}
            >
                <div className={gameStyle.sightImageWrapper}>
                    <img
                        src={image as string}
                        className={gameStyle.sightImage}
                        alt=""
                    />
                </div>

                {title ? (
                    <div
                        className={gameStyle.sightTitleWrapper}
                    >
                        <div
                            className={`${mainStyle.formTitle} ${mainStyle.textCenter} ${mainStyle.mb24} ${mainStyle.heading}`}
                        >
                            {title as ReactNode}
                        </div>
                    </div>
                ) : null}
            </button>
        </div>
    )
}
