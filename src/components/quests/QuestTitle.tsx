
import type { ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

export const QuestTitle = ({ title, city }: { title: unknown, city: unknown }) => {
    return (
        <div className={mainStyle.mt15}>
            <div className={`${questsStyle.city} ${questsStyle.cityText} ${mainStyle.textCenter}`}>
                {city as ReactNode}
            </div>
            <div className={`${mainStyle.titleMain} ${mainStyle.mt5}`}>
                {title as ReactNode}
            </div>
        </div>
    )
}
