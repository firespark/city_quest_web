import type { ComponentProps } from 'react'

import detailStyle from '../../styles/questDetailStyle.module.css'

import { AccessBadge, StatusBadge } from './QuestBadges'
import { StartButton } from './StartButton'

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
            className={detailStyle.hero}
            aria-label={title}
        >
            <img
                className={detailStyle.heroImage}
                src={image}
                alt=""
            />

            <div
                className={detailStyle.heroShade}
                aria-hidden="true"
            />

            <div className={detailStyle.heroContent}>

                {(paid || status) && (
                    <div className={detailStyle.badges}>
                        <AccessBadge
                            paid={paid}
                            available={available}
                        />

                        <StatusBadge status={status} />
                    </div>
                )}

                <div className={detailStyle.cityText}>
                    {city}
                </div>

                <h1 className={detailStyle.heroTitle}>
                    {title}
                </h1>

                {available && (
                    <div className={detailStyle.heroAction}>
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