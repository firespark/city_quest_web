import mainStyle from '../../styles/mainStyle.module.css'

import questsStyle from '../../styles/questsStyle.module.css'

import { FormattedContent } from '../common/FormattedContent'

type QuestContentProps = {
    content: string | string[] | null
}

export const QuestContent = ({ content }: QuestContentProps) => {
    if (!content) return null

    return (
        <section className={`${questsStyle.questOverview} ${questsStyle.questSection}`}>
            <div>
                <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                    Основная информация
                </div>

                <h2>О квесте</h2>
            </div>

            <div className={`${mainStyle.articleContent} ${mainStyle.bodyText} ${mainStyle.formattedContent}`}>
                <FormattedContent text={content} />
            </div>
        </section>
    )
}
