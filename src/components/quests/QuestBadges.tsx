
import {
    IoCheckmarkSharp,
    IoHourglassOutline,
    IoDiamondOutline
} from 'react-icons/io5'

import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

export const StatusBadge = ({ status }: { status: string | null }) => {
    if (status === 'finished') {
        return (
            <div className={`${questsStyle.questBadge} ${mainStyle.bgBlue}`}>
                <IoCheckmarkSharp size={12} color="#FFFFFF" />
                <span className={questsStyle.questBadgeText}>Пройден</span>
            </div>
        )
    }
    if (status === 'in_progress') {
        return (
            <div className={`${questsStyle.questBadge} ${mainStyle.bgOrange}`}>
                <IoHourglassOutline size={12} color="#FFFFFF" />
                <span className={questsStyle.questBadgeText}>В процессе</span>
            </div>
        )
    }
    return null
}

export const AccessBadge = ({ paid, available }: { paid: unknown, available: unknown }) => {
    if (paid && !available) {
        return (
            <div className={`${questsStyle.questBadge} ${mainStyle.bgPurple}`}>
                <IoDiamondOutline size={12} color="#FFFFFF" />
                <span className={questsStyle.questBadgeText}>Премиум</span>
            </div>
        )
    }
    if (paid && available) {
        return (
            <div className={`${questsStyle.questBadge} ${mainStyle.bgGreen}`}>
                <IoCheckmarkSharp size={12} color="#FFFFFF" />
                <span className={questsStyle.questBadgeText}>Куплен</span>
            </div>
        )
    }
    return null
}
