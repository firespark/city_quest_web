
import mainStyle from '../styles/mainStyle.module.css'

import { Hero } from '../components/main/Hero'
import { Countries } from '../components/countries/Countries'
import {
    FeaturedQuests,
    FeaturedQuestsProvider
} from '../components/quests/FeaturedQuests'
import { About } from '../components/main/About'

export const MainScreen = () => {
    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <Hero />

                <Countries />


                <FeaturedQuestsProvider>
                    <FeaturedQuests
                        offset={0}
                        title="Популярные квесты"
                        subtitle="Топ экскурсий в разных городах."
                    />

                    <About />

                    <FeaturedQuests
                        offset={3}
                        title="Ещё больше приключений"
                        subtitle="Новые маршруты для новых впечатлений."
                    />
                </FeaturedQuestsProvider>

            </main>
        </div>
    )
}
