
import { FormattedContent } from '../../common/FormattedContent'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

type ComingSoonAboutProps = {
    content: string | string[] | null
    additionalImage?: string | null
}

export const ComingSoonAbout = ({
    content,
    additionalImage
}: ComingSoonAboutProps) => {

    if (!content && !additionalImage) return null

    return (
        <section
            className={`
                ${comingSoonStyle.about}
                ${additionalImage ? comingSoonStyle.aboutWithImage : ''}
            `}
        >
            <div className={comingSoonStyle.aboutContent}>

                <div className={comingSoonStyle.eyebrow}>
                    О квесте
                </div>

                <h2 className={comingSoonStyle.sectionTitle}>
                    Что это за игра
                </h2>

                {content && (
                    <div className={comingSoonStyle.richText}>
                        <FormattedContent text={content} />
                    </div>
                )}

            </div>

            {additionalImage && (
                <div className={comingSoonStyle.aboutDecoration}>
                    <img
                        src={additionalImage}
                        alt=""
                        aria-hidden="true"
                        className={comingSoonStyle.aboutImage}
                    />
                </div>
            )}

        </section>
    )
}
