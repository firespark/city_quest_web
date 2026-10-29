
import { IoFlag, IoLibrary, IoLocation } from 'react-icons/io5'

import questsStyle from '../../styles/questsStyle.module.css'

type QuestStatsProps = {
    startPoint: string | null
    endPoint: string | null
    sightsCount: number
}

export const QuestStats = ({
    startPoint,
    endPoint,
    sightsCount
}: QuestStatsProps) => {
    return (
        <div className={questsStyle.stats}>

            <div className={questsStyle.stat}>
                <div className={questsStyle.statIcon}>
                    <IoLocation size={20} />
                </div>

                <div>
                    <div className={questsStyle.statLabel}>
                        Точка старта
                    </div>

                    <div className={questsStyle.statValue}>
                        {startPoint}
                    </div>
                </div>
            </div>

            <div className={questsStyle.stat}>
                <div className={questsStyle.statIcon}>
                    <IoFlag size={20} />
                </div>

                <div>
                    <div className={questsStyle.statLabel}>
                        Финиш
                    </div>

                    <div className={questsStyle.statValue}>
                        {endPoint}
                    </div>
                </div>
            </div>

            <div className={questsStyle.stat}>
                <div className={questsStyle.statIcon}>
                    <IoLibrary size={20} />
                </div>

                <div>
                    <div className={questsStyle.statLabel}>
                        Что посмотрим
                    </div>

                    <div className={questsStyle.statValue}>
                        {sightsCount} локаций
                    </div>
                </div>
            </div>

        </div>
    )
}
