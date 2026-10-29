
import type { ComponentProps } from 'react'

import questDetailStyle from '../../../styles/questDetailStyle.module.css'

import { AccessBadge, StatusBadge } from '../QuestBadges'
import { StartButton } from '../StartButton'


type QuestImageDetailProps = {
    image: string
    city: string
    title: string
    paid: boolean
    available: boolean
    status: 'finished' | 'in_progress' | null
    progress: string
    changeScreen: ComponentProps<typeof StartButton>['changeScreen']
}


export const QuestImageDetail = ({
    image,
    city,
    title,
    paid,
    available,
    status,
    progress,
    changeScreen
}: QuestImageDetailProps) => {

    return (
        <section
            className={questDetailStyle.hero}
            aria-label={title}
        >
            <img
                className={questDetailStyle.heroImage}
                src={image}
                alt=""
            />

            <div
                className={questDetailStyle.heroShade}
                aria-hidden="true"
            />

            <div className={questDetailStyle.heroContent}>

                {(paid || status) && (
                    <div className={questDetailStyle.badges}>
                        <AccessBadge
                            paid={paid}
                            available={available}
                        />

                        <StatusBadge status={status} />
                    </div>
                )}

                <div className={questDetailStyle.cityText}>
                    {city}
                </div>

                <h1 className={questDetailStyle.heroTitle}>
                    {title}
                </h1>

                {available && (
                    <div className={questDetailStyle.heroAction}>
                        <StartButton
                            changeScreen={changeScreen}
                            progress={progress}
                        />
                    </div>
                )}

            </div>
        </section>
    )
}
