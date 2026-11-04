
import mainStyle from '../../styles/mainStyle.module.css'

type NextGameProps = {
    nextGame: () => Promise<void>
}

export const NextGame = ({ nextGame }: NextGameProps) => {

    return (
        <div className={`${mainStyle.center} ${mainStyle.mt32} ${mainStyle.mb32}`}>
            <button
                type="button"
                className={mainStyle.button}
                onClick={() => {
                    nextGame()
                }}
            >
                <span className={mainStyle.buttonText}>
                    Дальше
                </span>
            </button>
        </div>
    )
}
