
import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

export const ResetButton = ({ setModalVisible }: {
    setModalVisible: (visible: boolean) => void
}) => {
    return (
        <div className={mainStyle.mt20}>
            <button
                type="button"
                className={questsStyle.buttonGhost}
                onClick={() => {
                    setModalVisible(true)
                }}
            >
                <span className={questsStyle.buttonTextGhost}>
                    Сбросить прогресс
                </span>
            </button>
        </div>
    )
}
