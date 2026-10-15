
import howPlayStyle from '../../styles/howPlayStyle.module.css'

type HowPlayBlockProps = {
    number: string
    title?: string | null
    description?: string | null
}

export const HowPlayBlock = ({ number, title, description }: HowPlayBlockProps) => {
    return (
        <div className={`${howPlayStyle.card} ${howPlayStyle.cardLight}`}>
            <div className={howPlayStyle.headerRow}>
                <div className={howPlayStyle.numberCircleLight}>
                    <span className={howPlayStyle.numberTextLight}>
                        {number}
                    </span>
                </div>

                <div className={howPlayStyle.titleLight}>
                    {title}
                </div>
            </div>

            <div>
                <div className={howPlayStyle.descLight}>
                    {description}
                </div>
            </div>
        </div>
    )
}
