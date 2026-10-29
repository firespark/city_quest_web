
import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

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
        <section className={comingSoonStyle.stepsSection}>

            <div className={comingSoonStyle.eyebrow}>
                Три шага до приключения
            </div>

            <h2 className={comingSoonStyle.stepsHeading}>
                Что тебя ждет
            </h2>

            <div className={comingSoonStyle.stepsGrid}>

                {steps.map(step => (
                    <div
                        key={step.number}
                        className={comingSoonStyle.stepCard}
                    >
                        <div className={comingSoonStyle.stepNumber}>
                            {String(step.number).padStart(2, '0')}
                        </div>

                        {step.title && (
                            <h3 className={comingSoonStyle.stepTitle}>
                                {step.title}
                            </h3>
                        )}

                        {step.description && (
                            <p className={comingSoonStyle.stepDescription}>
                                {step.description}
                            </p>
                        )}
                    </div>
                ))}

            </div>

        </section>
    )
}
