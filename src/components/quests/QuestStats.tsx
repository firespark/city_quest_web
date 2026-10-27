import { IoFlag, IoLibrary, IoLocation } from 'react-icons/io5'

import detailStyle from '../../styles/questDetailStyle.module.css'

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
        <div className={detailStyle.stats}>

            <div className={detailStyle.stat}>
                <div className={detailStyle.statIcon}>
                    <IoLocation size={20} />
                </div>

                <div>
                    <div className={detailStyle.statLabel}>
                        Точка старта
                    </div>

                    <div className={detailStyle.statValue}>
                        {startPoint}
                    </div>
                </div>
            </div>

            <div className={detailStyle.stat}>
                <div className={detailStyle.statIcon}>
                    <IoFlag size={20} />
                </div>

                <div>
                    <div className={detailStyle.statLabel}>
                        Финиш
                    </div>

                    <div className={detailStyle.statValue}>
                        {endPoint}
                    </div>
                </div>
            </div>

            <div className={detailStyle.stat}>
                <div className={detailStyle.statIcon}>
                    <IoLibrary size={20} />
                </div>

                <div>
                    <div className={detailStyle.statLabel}>
                        Что посмотрим
                    </div>

                    <div className={detailStyle.statValue}>
                        {sightsCount} локаций
                    </div>
                </div>
            </div>

        </div>
    )
}