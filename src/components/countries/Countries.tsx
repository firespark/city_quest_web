import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'flag-icons/css/flag-icons.min.css'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'
import { slugUrl } from '../../routes'

import { Loader } from '../common/Loader'
import { ConnectionError } from '../common/ConnectionError'

import mainStyle from '../../styles/mainStyle.module.css'
import countriesStyle from '../../styles/countriesStyle.module.css'

type CityData = {
    id: number
    title: string
    slug: string | null
    country_id: number
    children?: CityData[]
}

const flattenCities = (cities: CityData[]): CityData[] => {
    return cities.flatMap(city => [
        city,
        ...flattenCities(city.children ?? [])
    ])
}

export const Countries = () => {
    const { countries, getCountries } = useContext(MainContext)

    const [data, setData] = useState<CityData[]>()
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        setError(null)
        setLoader(true)

        try {
            const url = `${import.meta.env.VITE_API_URL}/cities/all`
            const output = await Http.get<CityData[]>(url)

            if (output.success == 1 && Array.isArray(output.data)) {
                const cities = flattenCities(output.data)

                if (cities.some(city => city.country_id == null)) {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                } else {
                    setData(cities)
                }
            } else {
                setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('connection_error')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        void fetchData()
    }, [])

    const countriesWithCities = countries
        .map(country => ({
            country,
            cities: (data ?? []).filter(city => city.country_id === country.id)
        }))
        .filter(({ cities }) => cities.length > 0)

    if (!loader && !error && countries.length > 0 && countriesWithCities.length === 0) {
        return null
    }

    return (
        <section className={countriesStyle.countriesSection}>
            <div className={countriesStyle.countriesInner}>
                <h2 className={mainStyle.welcomeTitle}>
                    Доступные города
                </h2>

                <p className={mainStyle.description}>
                    Квесты в ваших городах.
                </p>

                {loader ? (
                    <Loader />
                ) : error === 'connection_error' ? (
                    <ConnectionError onRetry={fetchData} />
                ) : error ? (
                    <div className={mainStyle.errorText}>{error}</div>
                ) : countries.length === 0 ? (
                    <ConnectionError onRetry={getCountries} />
                ) : (
                    <div className={countriesStyle.countriesGrid}>
                        {countriesWithCities.map(({ country, cities }) => (
                            <div key={country.id} className={countriesStyle.countryCard}>
                                <h3 className={countriesStyle.countryHeading}>
                                    {country.flag && (
                                        <span
                                            className={`fi fi-${country.flag.toLowerCase()}`}
                                            aria-hidden="true"
                                        />
                                    )}
                                    {country.title}
                                </h3>

                                <div className={countriesStyle.countryCities}>
                                    {cities.map(city => city.slug ? (
                                        <Link key={city.id} to={slugUrl(city.slug)}>
                                            {city.title}
                                        </Link>
                                    ) : (
                                        <span key={city.id}>{city.title}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}