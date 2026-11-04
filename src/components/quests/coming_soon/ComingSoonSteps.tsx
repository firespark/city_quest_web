import questsStyle from '../../../styles/questsStyle.module.css'
import mainStyle from '../../../styles/mainStyle.module.css'

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

            <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                Три шага до приключения
            </div>

            <h2 className={questsStyle.panelTitle}>
                Что тебя ждет
            </h2>

            <div className={`${mainStyle.cardGrid} ${mainStyle.announcementGrid}`}>

                {steps.map(step => (
                    <div
                        key={step.number}
                        className={`${mainStyle.stepCard} ${mainStyle.bgWhite}`}
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
                            <p className={mainStyle.bodyText}>
                                {step.description}
                            </p>
                        )}
                    </div>
                ))}

            </div>

        </section>
    )
}
