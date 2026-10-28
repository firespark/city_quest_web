
import { slugUrl } from '../routes'

import mainStyle from '../styles/mainStyle.module.css'
import comingSoonStyle from '../styles/comingSoonStyle.module.css'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { QuestStats } from '../components/quests/QuestStats'
import { QuestContent2 } from '../components/quests/QuestContent2'

import { ComingSoonHero } from '../components/quests/coming_soon/ComingSoonHero'
import { ComingSoonAbout } from '../components/quests/coming_soon/ComingSoonAbout'
import {
    ComingSoonSteps,
    type ComingSoonStep
} from '../components/quests/coming_soon/ComingSoonSteps'

import { ComingSoonSignup } from '../components/quests/coming_soon/ComingSoonSignup'
import { ComingSoonSignup2 } from '../components/quests/coming_soon/ComingSoonSignup2'

import {
    ComingSoonGallery,
    type ComingSoonGalleryPhoto
} from '../components/quests/coming_soon/ComingSoonGallery'


export type ComingSoonQuestData = {
    id: number
    title: string
    slug: string
    image: string
    city: string
    city_slug: string
    content: string | string[] | null
    content2: string | string[] | null
    start_point: string | null
    end_point: string | null
    sights_count: number
    coming_soon: boolean

    coming_soon_banner_icon?: string | null
    coming_soon_additional_image?: string | null
    coming_soon_steps?: ComingSoonStep[]
    coming_soon_gallery?: ComingSoonGalleryPhoto[]
}


type ComingSoonScreenProps = {
    quest: ComingSoonQuestData
}


export const ComingSoonScreen = ({
    quest
}: ComingSoonScreenProps) => {

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={comingSoonStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: '/' },
                            {
                                label: quest.city,
                                to: slugUrl(quest.city_slug)
                            },
                            { label: quest.title }
                        ]}
                    />

                    <ComingSoonHero
                        title={quest.title}
                        city={quest.city}
                        image={quest.image}
                        bannerIcon={quest.coming_soon_banner_icon}
                    />

                    <QuestStats
                        startPoint={quest.start_point}
                        endPoint={quest.end_point}
                        sightsCount={quest.sights_count}
                    />

                    <ComingSoonAbout
                        content={quest.content}
                        additionalImage={quest.coming_soon_additional_image}
                    />

                    <ComingSoonSteps
                        steps={quest.coming_soon_steps ?? []}
                    />

                    <ComingSoonSignup />

                    <ComingSoonGallery
                        photos={quest.coming_soon_gallery ?? []}
                    />

                    {quest.content2 && (
                        <div className={comingSoonStyle.additionalContent}>
                            <QuestContent2
                                content={quest.content2}
                            />
                        </div>
                    )}

                    <ComingSoonSignup2 />

                </div>

            </main>
        </div>
    )
}
