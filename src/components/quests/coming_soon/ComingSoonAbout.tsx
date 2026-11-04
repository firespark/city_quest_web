import { imageAlt } from '../../../scripts/imageAlt'

import questsStyle from '../../../styles/questsStyle.module.css'
import mainStyle from '../../../styles/mainStyle.module.css'

import { FormattedContent } from '../../common/FormattedContent'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

type ComingSoonAboutProps = {
    content: string | string[] | null
    additionalImage?: string | null
    questTitle: string
}

export const ComingSoonAbout = ({
    content,
    additionalImage,
    questTitle
}: ComingSoonAboutProps) => {

    if (!content && !additionalImage) return null

    return (
        <section
            className={`
                ${comingSoonStyle.about}
                ${additionalImage ? comingSoonStyle.aboutWithImage : ''}
                ${questsStyle.questSection}
            `}
        >
            <div className={mainStyle.shrinkable}>

                <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                    О квесте
                </div>

                <h2>Что это за игра</h2>

                {content && (
                    <div className={`${mainStyle.articleContent} ${mainStyle.bodyText} ${mainStyle.formattedContent}`}>
                        <FormattedContent text={content} />
                    </div>
                )}

            </div>

            {additionalImage && (
                <div className={comingSoonStyle.aboutDecoration}>
                    <img
                        src={additionalImage}
                        alt={imageAlt('иллюстрации квеста', questTitle)}
                        aria-hidden="true"
                        className={comingSoonStyle.aboutImage}
                    />
                </div>
            )}

        </section>
    )
}
