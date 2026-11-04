
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
        <div className={`${mainStyle.wrapper} ${mainStyle.mt8} ${mainStyle.mb16}`}>

            <div className={questsStyle.questStatRow}>
                <div className={questsStyle.questIconCircle}>
                    <IoLocation size={20} className={mainStyle.green} />
                </div>
                <div className={mainStyle.textColumn}>
                    <div className={mainStyle.metaLabel}>Точка старта</div>
                    <div className={mainStyle.textSemibold}>{start as ReactNode}</div>
                </div>
            </div>

            <div className={`${mainStyle.divider} ${mainStyle.mt12}`} />

            <div className={questsStyle.questStatRow}>
                <div className={questsStyle.questIconCircle}>
                    <IoFlag size={20} className={mainStyle.red} />
                </div>
                <div className={mainStyle.textColumn}>
                    <div className={mainStyle.metaLabel}>Финиш</div>
                    <div className={mainStyle.textSemibold}>{finish as ReactNode}</div>
                </div>
            </div>

            <div className={`${mainStyle.divider} ${mainStyle.mt12}`} />

            <div className={questsStyle.questStatRow}>
                <div className={questsStyle.questIconCircle}>
                    <IoLibrary size={20} className={mainStyle.blue} />
                </div>
                <div className={mainStyle.textColumn}>
                    <div className={mainStyle.metaLabel}>Что посмотрим</div>
                    <div className={mainStyle.textSemibold}>
                        {sights_count as ReactNode} локаций
                    </div>
                </div>
            </div>

        </div>
    )
}
