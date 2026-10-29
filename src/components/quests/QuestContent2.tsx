
import questsStyle from '../../styles/questsStyle.module.css'

import { FormattedContent } from '../common/FormattedContent'

type QuestContent2Props = {
    content: string | string[] | null
}

export const QuestContent2 = ({ content }: QuestContent2Props) => {
    if (!content) return null

    return (
        <section className={questsStyle.facts}>
            <div>
                <div className={questsStyle.eyebrow}>
                    Дополнительная информация
                </div>

                <h2 className={questsStyle.sectionTitle}>
                    Подробнее о локации
                </h2>
            </div>

            <div className={questsStyle.richText}>
                <FormattedContent text={content} />
            </div>
        </section>
    )
}
