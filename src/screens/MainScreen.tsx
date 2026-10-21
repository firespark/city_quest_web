
import { useContext } from 'react'
import mainStyle from '../styles/mainStyle.module.css'

import { CountrySelector } from '../components/countries/CountrySelector'
import { PopularCities } from '../components/cities/PopularCities'
import { MainContext } from '../context/mainContext'
import { ConnectionError } from '../components/common/ConnectionError'

export const MainScreen = () => {

    const { countryId, countries, getCountries } = useContext(MainContext)

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>


            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <CountrySelector />

                {countryId ? (
                    <>
                        <div className={mainStyle.welcomeBlock}>
                            <div className={mainStyle.welcomeTitle}>
                                Куда отправимся?
                            </div>
                            <div className={mainStyle.welcomeSubtitle}>
                                Выберите город для ваших приключений
                            </div>
                        </div>
                        <PopularCities />
                    </>
                ) : (

                    countries.length === 0 ? (
                        <ConnectionError onRetry={getCountries} />
                    ) : null
                )}
            </main>

        </div>
    )
}
