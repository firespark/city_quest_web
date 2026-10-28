
import style from '../../../styles/comingSoonStyle.module.css'

export type ComingSoonStep = {
    number: number
    title: string
    description: string
}

type ComingSoonStepsProps = {
    steps: ComingSoonStep[]
}

export const ComingSoonSteps = ({
    steps
}: ComingSoonStepsProps) => {

    if (steps.length === 0) return null

    return (
        <section className={style.stepsSection}>

            <div className={style.eyebrow}>
                Три шага до приключения
            </div>

            <h2 className={style.stepsHeading}>
                Что тебя ждет
            </h2>

            <div className={style.stepsGrid}>

                {steps.map(step => (
                    <div
                        key={step.number}
                        className={style.stepCard}
                    >
                        <div className={style.stepNumber}>
                            {String(step.number).padStart(2, '0')}
                        </div>

                        {step.title && (
                            <h3 className={style.stepTitle}>
                                {step.title}
                            </h3>
                        )}

                        {step.description && (
                            <p className={style.stepDescription}>
                                {step.description}
                            </p>
                        )}
                    </div>
                ))}

            </div>

        </section>
    )
}
