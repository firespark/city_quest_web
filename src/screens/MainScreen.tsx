
import { useContext } from 'react'
import mainStyle from '../styles/mainStyle.module.css'
import headerStyle from '../styles/headerStyle.module.css'
import { Logo } from '../components/common/Logo'
import { Menu } from '../components/common/Menu'
import { CountrySelector } from '../components/countries/CountrySelector'
import { PopularCities } from '../components/cities/PopularCities'
import { Footer } from '../components/common/Footer'
import { MainContext } from '../context/mainContext'
import { ConnectionError } from '../components/common/ConnectionError'

export const MainScreen = () => {

    const { countryId, countries, getCountries } = useContext(MainContext)

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <header className={headerStyle.panelHeader}>
                <Logo />
                <Menu />
            </header>

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

            <Footer active="home" />
        </div>
    )
}
