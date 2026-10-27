import detailStyle from '../../styles/questDetailStyle.module.css'

import { FormattedContent } from '../common/FormattedContent'

type QuestContentProps = {
    content: string | string[] | null
}

export const QuestContent = ({ content }: QuestContentProps) => {
    if (!content) return null

    return (
        <section className={detailStyle.description}>
            <div>
                <div className={detailStyle.eyebrow}>
                    Основная информация
                </div>

                <h2 className={detailStyle.sectionTitle}>
                    О квесте
                </h2>
            </div>

            <div className={detailStyle.richText}>
                <FormattedContent text={content} />
            </div>
        </section>
    )
}