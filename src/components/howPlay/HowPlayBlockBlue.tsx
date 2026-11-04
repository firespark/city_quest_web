import mainStyle from '../../styles/mainStyle.module.css'

import howPlayStyle from '../../styles/howPlayStyle.module.css'

type HowPlayBlockBlueProps = {
    number: string
    title?: string | null
    description?: string | null
}

export const HowPlayBlockBlue = ({
    number,
    title,
    description
}: HowPlayBlockBlueProps) => {

    return (
        <section className={`${mainStyle.stepCard} ${mainStyle.bgLightGray}`}>

            <div className={howPlayStyle.headerRow}>

                <div className={`${howPlayStyle.stepNumberCircle} ${howPlayStyle.stepNumberCircleContrast}`}>
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
