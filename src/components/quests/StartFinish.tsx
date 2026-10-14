
import type { ReactNode } from 'react'
import { IoLocation, IoFlag, IoLibrary } from 'react-icons/io5'

import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

export const StartFinish = ({ start, finish, sights_count }: {
    start: unknown
    finish: unknown
    sights_count: unknown
}) => {
    return (
        <div className={`${mainStyle.wrapper} ${mainStyle.mt5} ${mainStyle.mb15}`}>

            <div className={questsStyle.questStatRow}>
                <div className={questsStyle.questIconCircle}>
                    <IoLocation size={20} color="#4CAF50" />
                </div>
                <div className={questsStyle.questTextContainer}>
                    <div className={questsStyle.questLabel}>Точка старта</div>
                    <div className={questsStyle.questValue}>{start as ReactNode}</div>
                </div>
            </div>

            <div className={`${mainStyle.divider} ${mainStyle.mt10}`} />

            <div className={questsStyle.questStatRow}>
                <div className={questsStyle.questIconCircle}>
                    <IoFlag size={20} color="#E74C3C" />
                </div>
                <div className={questsStyle.questTextContainer}>
                    <div className={questsStyle.questLabel}>Финиш</div>
                    <div className={questsStyle.questValue}>{finish as ReactNode}</div>
                </div>
            </div>

            <div className={`${mainStyle.divider} ${mainStyle.mt10}`} />

            <div className={questsStyle.questStatRow}>
                <div className={questsStyle.questIconCircle}>
                    <IoLibrary size={20} color="#17A2B8" />
                </div>
                <div className={questsStyle.questTextContainer}>
                    <div className={questsStyle.questLabel}>Что посмотрим</div>
                    <div className={questsStyle.questValue}>
                        {sights_count as ReactNode} локаций
                    </div>
                </div>
            </div>

        </div>
    )
}
