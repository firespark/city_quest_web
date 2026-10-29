
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
        <section className={`${howPlayStyle.card} ${howPlayStyle.cardBlue}`}>

            <div className={howPlayStyle.headerRow}>

                <div className={howPlayStyle.numberCircleBlue}>
                    <span className={howPlayStyle.numberTextBlue}>
                        {number}
                    </span>
                </div>

                {title && (
                    <h2 className={howPlayStyle.titleBlue}>
                        {title}
                    </h2>
                )}

            </div>

            {description && (
                <p className={howPlayStyle.descBlue}>
                    {description}
                </p>
            )}

        </section>
    )
}
