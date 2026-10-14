
import questsStyle from '../../styles/questsStyle.module.css'

import { StatusBadge, AccessBadge } from './QuestBadges'

type QuestImageData = {
    status?: string | null
    [key: string]: unknown
}

export const QuestImage = ({ data }: { data: QuestImageData }) => {
    return (
        <div className={questsStyle.questImageWrapper}>
            <img
                src={data.image as string}
                className={questsStyle.questHeroImage}
                alt=""
            />
            <div className={questsStyle.questBadgesTopLeft}>
                <AccessBadge paid={data.paid} available={data.available} />
            </div>
            <div className={questsStyle.questBadgesTopRight}>
                <StatusBadge status={data.status as string | null} />
            </div>
        </div>
    )
}
