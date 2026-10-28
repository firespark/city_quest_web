
import { FormattedContent } from '../../common/FormattedContent'

import style from '../../../styles/comingSoonStyle.module.css'

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
                ${style.about}
                ${additionalImage ? style.aboutWithImage : ''}
            `}
        >
            <div className={style.aboutContent}>

                <div className={style.eyebrow}>
                    О квесте
                </div>

                <h2 className={style.sectionTitle}>
                    Что это за игра
                </h2>

                {content && (
                    <div className={style.richText}>
                        <FormattedContent text={content} />
                    </div>
                )}

            </div>

            {additionalImage && (
                <div className={style.aboutDecoration}>
                    <img
                        src={additionalImage}
                        alt=""
                        aria-hidden="true"
                        className={style.aboutImage}
                    />
                </div>
            )}

        </section>
    )
}
