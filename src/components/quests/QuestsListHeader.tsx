import mainStyle from '../../styles/mainStyle.module.css'

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
                <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                    Маршруты и приключения
                </div>

                <h1>Квесты в городе {cityTitle}</h1>

                <div className={mainStyle.bodyText}>Каждый маршрут открывает город с новой стороны.</div>
            </div>

            {questsCount !== undefined && questsCount > 0 && (
                <div className={questsStyle.questsListCount}>
                    Квестов: {questsCount}
                </div>
            )}

        </div>
    )
}
