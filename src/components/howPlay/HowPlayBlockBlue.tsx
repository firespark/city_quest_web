
import howPlayStyle from '../../styles/howPlayStyle.module.css'

type HowPlayBlockBlueProps = {
    number: string
    title?: string | null
    description?: string | null
}

export const HowPlayBlockBlue = ({ number, title, description }: HowPlayBlockBlueProps) => {
    return (
        <div className={`${howPlayStyle.card} ${howPlayStyle.cardBlue}`}>
            <div className={howPlayStyle.headerRow}>
                <div className={howPlayStyle.numberCircleBlue}>
                    <span className={howPlayStyle.numberTextBlue}>
                        {number}
                    </span>
                </div>

                <div className={howPlayStyle.titleBlue}>
                    {title}
                </div>
            </div>

            <div>
                <div className={howPlayStyle.descBlue}>
                    {description}
                </div>
            </div>
        </div>
    )
}
