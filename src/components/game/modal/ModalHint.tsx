
import FullWidthImage from '../../common/FullWidthImage'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type HintData = {
    image?: string | null
    text?: string | null
}

type ModalHintProps = {
    game: GameData
    task: number
}

export const ModalHint = ({ game, task }: ModalHintProps) => {
    let hint = game.sight_hint1 as HintData

    if (task == 2) {
        hint = game.sight_hint2 as HintData
    }

    return (
        <div className={mainStyle.container}>
            <div className={mainStyle.titleMain}>
                Подсказка
            </div>

            {hint.image ? (
                <FullWidthImage
                    style={gameStyle.gameImage}
                    source={{
                        uri: hint.image + '?time=' + new Date().getTime()
                    }}
                />
            ) : null}

            <div className={gameStyle.gameText}>
                {hint.text}
            </div>
        </div>
    )
}
