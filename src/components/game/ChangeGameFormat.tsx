
import type { Dispatch, SetStateAction } from 'react'
import { IoFootstepsOutline, IoExtensionPuzzleOutline } from 'react-icons/io5'

import gameStyle from '../../styles/gameStyle.module.css'

type ChangeGameFormatProps = {
    formatId: unknown
    setModal: Dispatch<SetStateAction<string | null>>
}

export const ChangeGameFormat = ({ formatId, setModal }: ChangeGameFormatProps) => {

    const TargetIcon = formatId === 1
        ? IoFootstepsOutline
        : IoExtensionPuzzleOutline

    return (
        <div>
            <button
                type="button"
                className={`${gameStyle.pill} ${gameStyle.formatPill} ${gameStyle.pillActiveGreen}`}
                aria-label="Сменить формат"
                onClick={() => setModal('changeFormat')}
            >
                <TargetIcon
                    size={22}
                    color="#027900"
                    className={gameStyle.formatIcon}
                />
            </button>
        </div>
    )
}
