
import questsStyle from '../../styles/questsStyle.module.css'

import { FormattedContent } from '../common/FormattedContent'

type QuestContentProps = {
    content: string | string[] | null
}

export const QuestContent = ({ content }: QuestContentProps) => {
    if (!content) return null

    return (
        <section className={questsStyle.description}>
            <div>
                <div className={questsStyle.eyebrow}>
                    Основная информация
                </div>

                <h2 className={questsStyle.sectionTitle}>
                    О квесте
                </h2>
            </div>

            <div className={questsStyle.richText}>
                <FormattedContent text={content} />
            </div>
        </section>
    )
}
