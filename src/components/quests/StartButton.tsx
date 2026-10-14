
import { GAME_SCREEN } from '../../context/types'

import mainStyle from '../../styles/mainStyle.module.css'

export const StartButton = ({ changeScreen, progress }: {
    changeScreen: (screen: string) => void
    progress: string
}) => {
    return (
        <div>
            <button
                type="button"
                className={mainStyle.primaryButton}
                onClick={() => changeScreen(GAME_SCREEN)}
            >
                <span className={mainStyle.primaryButtonText}>{progress}</span>
            </button>
        </div>
    )
}
