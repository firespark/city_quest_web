
import mainStyle from '../../styles/mainStyle.module.css'

type ResetButtonProps = {
    setModalVisible: (visible: boolean) => void
}

export const ResetButton = ({
    setModalVisible
}: ResetButtonProps) => {

    return (
        <button
            type="button"
            className={`
                ${mainStyle.siteButton}
                ${mainStyle.siteButtonDanger}
                ${mainStyle.siteButtonSmall}
            `}
            onClick={() => setModalVisible(true)}
        >
            Сбросить прогресс
        </button>
    )
}
