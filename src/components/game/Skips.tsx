
import type { Dispatch, SetStateAction, ReactNode } from 'react'
import { IoDiamondOutline } from 'react-icons/io5'

import gameStyle from '../../styles/gameStyle.module.css'

import skipImage from '../../../assets/img/skip.png'
import skipDisabledImage from '../../../assets/img/skip-disabled.png'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type SkipsProps = {
    skips: unknown
    showSkip: unknown
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
}

export const Skips = ({ skips, showSkip, setModal }: SkipsProps) => {

    return (
        <div>
            {showSkip ? (
                <button
                    type="button"
                    className={`${gameStyle.pill} ${gameStyle.pillActive}`}
                    onClick={() => setModal('skip')}
                >
                    <img
                        src={skipImage}
                        className={gameStyle.hintIcon}
                        alt=""
                    />
                    <span className={gameStyle.skipTextActive}>
                        {skips as ReactNode}
                    </span>
                </button>
            ) : (
                <button
                    type="button"
                    className={`${gameStyle.pill} ${gameStyle.pillDisabled}`}
                    disabled
                    title={skips === 0 ? 'Покупка пропусков на сайте пока недоступна' : undefined}
                >
                    <img
                        src={skipDisabledImage}
                        className={gameStyle.hintIcon}
                        alt=""
                    />
                    <span className={gameStyle.textDisabled}>
                        {skips as ReactNode}
                    </span>

                    {skips === 0 && (
                        <span className={gameStyle.pillPremiumSign}>
                            <IoDiamondOutline size={10} color="#FFFFFF" />
                        </span>
                    )}
                </button>
            )}
        </div>
    )
}
