
import type { ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

export const QuestTitle = ({ title, city }: { title: unknown, city: unknown }) => {
    return (
        <div className={mainStyle.mt16}>
            <div className={`${questsStyle.city} ${questsStyle.questCityCaption} ${mainStyle.textCenter}`}>
                {city as ReactNode}
            </div>
            <div className={`${mainStyle.formTitle} ${mainStyle.textCenter} ${mainStyle.mb24} ${mainStyle.mt8} ${mainStyle.heading}`}>{title as ReactNode}</div>
        </div>
    )
}
