
import { useContext } from 'react'

import mainStyle from '../styles/mainStyle.module.css'
import headerStyle from '../styles/headerStyle.module.css'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'
import { Quests } from '../components/quests/Quests'
import { Footer } from '../components/common/Footer'

import { MainContext } from '../context/mainContext'

export const QuestsScreen = () => {
    const { cityData } = useContext(MainContext)

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <header className={`${mainStyle.panelRow} ${headerStyle.panelHeader}`}>
                <Back />
                <HeaderTitle title="Квест-Туры" />
                <Menu />
            </header>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.container}>
                    <div className={mainStyle.welcomeTitle}>
                        {cityData!.title}
                    </div>
                </div>

                <Quests
                    cityId={cityData!.id}
                    showFilters={true}
                />
            </main>

            <Footer />
        </div>
    )
}
