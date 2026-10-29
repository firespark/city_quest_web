
import questsStyle from '../../styles/questsStyle.module.css'

type QuestsListHeaderProps = {
    cityTitle?: string
    questsCount?: number
}

export const QuestsListHeader = ({
    cityTitle,
    questsCount
}: QuestsListHeaderProps) => {

    return (
        <div className={questsStyle.questsListHeader}>

            <div>
                <div className={questsStyle.questsListEyebrow}>
                    Маршруты и приключения
                </div>

                <h1 className={questsStyle.questsListTitle}>
                    Квесты в городе {cityTitle}
                </h1>

                <p className={questsStyle.questsListDescription}>
                    Каждый маршрут открывает город с новой стороны.
                </p>
            </div>

            {questsCount !== undefined && questsCount > 0 && (
                <div className={questsStyle.questsListCount}>
                    Квестов: {questsCount}
                </div>
            )}

        </div>
    )
}
