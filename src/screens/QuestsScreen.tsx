
import { useContext } from 'react'

import mainStyle from '../styles/mainStyle.module.css'


import { MainContext } from '../context/mainContext'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Quests } from '../components/quests/Quests'

export const QuestsScreen = () => {

    const { cityData } = useContext(MainContext)

    if (!cityData) return null

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll} ${mainStyle.scrollArea}`}>

                <div className={mainStyle.sitePage}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: '/' },
                            { label: cityData.title }
                        ]}
                    />

                    <Quests
                        key={cityData.id}
                        cityId={cityData.id}
                        showFilters={true}
                    />

                </div>

            </main>
        </div>
    )
}
