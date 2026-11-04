
import type { Dispatch, SetStateAction } from 'react'

import gameStyle from '../../styles/gameStyle.module.css'
import mainStyle from '../../styles/mainStyle.module.css'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type ProgressBarProps = {
    game: GameData
    setModal: Dispatch<SetStateAction<string | null>>
    setGame?: Dispatch<SetStateAction<GameData>>
}

export const ProgressBar = ({ game, setModal }: ProgressBarProps) => {

    const content = []

    const levels = game.levels as number
    const stepTotal = game.step_total as number

    for (let i = 1; i <= levels; i++) {
        let st: string | string[] = gameStyle.progressDisabled

        if (i < stepTotal) st = mainStyle.bgBlue
        if (i == levels) st = mainStyle.bgRed
        if (i == stepTotal) st = mainStyle.bgGreen
        if (i == levels && i == stepTotal) st = `${gameStyle.progressFinishDone} ${mainStyle.bgOrange}`
        if (i == game.step) st = gameStyle.progressCurrent
        if (i == game.step && i == levels) {
            st = [gameStyle.progressCurrent, `${gameStyle.progressFinishDone} ${mainStyle.bgOrange}`]
        }

        content.push(
            <span
                key={i}
                className={[
                    gameStyle.progressPoint,
                    ...(Array.isArray(st) ? st : [st])
                ].join(' ')}
            />
        )
    }

    return (
        <button
            type="button"
            className={`${gameStyle.barContainer} ${mainStyle.mt12}`}
            onClick={() => {
                setModal('progress')
            }}
            aria-label="Открыть карту прогресса"
        >
            {content}
        </button>
    )
}
