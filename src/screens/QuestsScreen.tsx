
import { useContext } from 'react'

import mainStyle from '../styles/mainStyle.module.css'

import { Quests } from '../components/quests/Quests'

import { MainContext } from '../context/mainContext'

export const QuestsScreen = () => {
    const { cityData } = useContext(MainContext)

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            
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

        </div>
    )
}
