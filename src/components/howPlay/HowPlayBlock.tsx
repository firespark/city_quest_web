
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
        <section className={`${howPlayStyle.card} ${howPlayStyle.cardLight}`}>

            <div className={howPlayStyle.headerRow}>

                <div className={howPlayStyle.numberCircleLight}>
                    <span className={howPlayStyle.numberTextLight}>
                        {number}
                    </span>
                </div>

                {title && (
                    <h2 className={howPlayStyle.titleLight}>
                        {title}
                    </h2>
                )}

            </div>

            {description && (
                <p className={howPlayStyle.descLight}>
                    {description}
                </p>
            )}

        </section>
    )
}
