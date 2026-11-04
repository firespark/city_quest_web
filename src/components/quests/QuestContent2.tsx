import mainStyle from '../../styles/mainStyle.module.css'

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
                <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                    Дополнительная информация
                </div>

                <h2 className={questsStyle.sectionTitle}>
                    Подробнее о локации
                </h2>
            </div>

            <div className={`${mainStyle.articleContent} ${mainStyle.bodyText} ${mainStyle.formattedContent}`}>
                <FormattedContent text={content} />
            </div>
        </section>
    )
}
