import { QuestAppAction, type QuestAppActionProps } from './QuestAppAction'

import questDetailStyle from '../../../styles/questDetailStyle.module.css'
import mainStyle from '../../../styles/mainStyle.module.css'

type QuestDetailButtonProps = QuestAppActionProps & {
    title: string
}

export const QuestDetailButton = ({ title, ...action }: QuestDetailButtonProps) => {
    return (
        <div className={questDetailStyle.finalAction}>
            <div className={questDetailStyle.finalInfo}>
                <strong className={`${questDetailStyle.finalTitle} ${mainStyle.heading}`}>{title}</strong>
                <p>Проходи квест в мобильном приложении Гагара Тур.</p>
            </div>
            <div className={questDetailStyle.finalButton}>
                <QuestAppAction {...action} showPaymentHint />
            </div>
        </div>
    )
}
