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
        <div className={`${mainStyle.stepCard} ${mainStyle.bgLightGray}`}>

            <div className={howPlayStyle.headerRow}>

                <div className={`${howPlayStyle.stepNumberCircle} ${howPlayStyle.stepNumberCircleContrast}`}>
                    <span className={howPlayStyle.stepNumberText}>
                        {number}
                    </span>
                </div>

                {title && (
                    <div className={howPlayStyle.stepHeading}>{title}</div>
                )}

            </div>

            {description && (
                <div className={mainStyle.bodyText}>{description}</div>
            )}

        </div>
    )
}
