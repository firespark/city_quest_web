import detailStyle from '../../styles/questDetailStyle.module.css'

import { FormattedContent } from '../common/FormattedContent'

type QuestContent2Props = {
    content: string | string[] | null
}

export const QuestContent2 = ({ content }: QuestContent2Props) => {
    if (!content) return null

    return (
        <section className={detailStyle.facts}>
            <div>
                <div className={detailStyle.eyebrow}>
                    Дополнительная информация
                </div>

                <h2 className={detailStyle.sectionTitle}>
                    Подробнее о локации
                </h2>
            </div>

            <div className={detailStyle.richText}>
                <FormattedContent text={content} />
            </div>
        </section>
    )
}