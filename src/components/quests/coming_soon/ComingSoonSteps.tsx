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
        <div className={comingSoonStyle.stepsSection}>

            <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                Три шага до приключения
            </div>

            <div className={comingSoonStyle.panelTitle}>Что тебя ждет</div>

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
                            <div className={mainStyle.stepTitle}>{step.title}</div>
                        )}

                        {step.description && (
                            <p className={mainStyle.bodyText}>{step.description}</p>
                        )}
                    </div>
                ))}

            </div>

        </div>
    )
}
