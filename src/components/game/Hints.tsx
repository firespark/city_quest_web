
import type { Dispatch, SetStateAction, ReactNode } from 'react'
import { IoDiamondOutline } from 'react-icons/io5'

import gameStyle from '../../styles/gameStyle.module.css'

import hintImage from '../../../assets/img/hint.png'
import hintDisabledImage from '../../../assets/img/hint-disabled.png'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type HintsProps = {
    hints: unknown
    showHint: unknown
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
}

export const Hints = ({ hints, showHint, setModal }: HintsProps) => {

    return (
        <div>
            {showHint ? (
                <button
                    type="button"
                    className={`${gameStyle.pill} ${gameStyle.pillActiveOrange}`}
                    onClick={() => setModal('hint')}
                >
                    <img
                        src={hintImage}
                        className={gameStyle.hintIcon}
                        alt=""
                    />
                    <span className={gameStyle.hintTextActive}>
                        {hints as ReactNode}
                    </span>
                </button>
            ) : (
                <button
                    type="button"
                    className={`${gameStyle.pill} ${gameStyle.pillDisabled}`}
                    disabled
                    title={hints === 0 ? 'Покупка подсказок на сайте пока недоступна' : undefined}
                >
                    <img
                        src={hintDisabledImage}
                        className={gameStyle.hintIcon}
                        alt=""
                    />
                    <span className={gameStyle.hintTextDisabled}>
                        {hints as ReactNode}
                    </span>

                    {hints === 0 && (
                        <span className={gameStyle.pillPremiumSign}>
                            <IoDiamondOutline size={10} color="#FFFFFF" />
                        </span>
                    )}
                </button>
            )}
        </div>
    )
}
