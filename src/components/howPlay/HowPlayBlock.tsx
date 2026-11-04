import mainStyle from '../../styles/mainStyle.module.css'

import howPlayStyle from '../../styles/howPlayStyle.module.css'

type HowPlayBlockProps = {
    number: string
    title?: string | null
    description?: string | null
}

export const HowPlayBlock = ({
    number,
    title,
    description
}: HowPlayBlockProps) => {

    return (
        <section className={`${mainStyle.stepCard} ${mainStyle.bgWhite}`}>

            <div className={howPlayStyle.headerRow}>

                <div className={howPlayStyle.stepNumberCircle}>
                    <span className={howPlayStyle.stepNumberText}>
                        {number}
                    </span>
                </div>

                {title && (
                    <h2 className={howPlayStyle.stepHeading}>
                        {title}
                    </h2>
                )}

            </div>

            {description && (
                <p className={mainStyle.bodyText}>
                    {description}
                </p>
            )}

        </section>
    )
}
