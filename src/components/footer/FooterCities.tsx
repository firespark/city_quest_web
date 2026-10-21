
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import footerStyle from '../../styles/footerStyle.module.css'

import { Loader } from '../common/Loader'
import { ConnectionError } from '../common/ConnectionError'

import { Http } from '../../scripts/http'
import { slugUrl } from '../../routes'

type CityData = {
    id: number
    title: string
    slug: string | null
    children?: CityData[]
}

const flattenCities = (cities: CityData[]): CityData[] => {
    return cities.flatMap(city => [
        city,
        ...flattenCities(city.children ?? [])
    ])
}

export const FooterCities = () => {

    const [data, setData] = useState<CityData[]>()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {

        setError(null)
        setLoader(true)

        try {

            const url = `${import.meta.env.VITE_API_URL}/cities/all`
            const output = await Http.get<CityData[]>(url)

            if (output.success == 1) {
                setData(output.data)
            }
            else {
                setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
        }
        catch (e) {
            console.error('Error:', e)
            setError('connection_error')
        }
        finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const cities = data ? flattenCities(data) : []

    return (
        <div>
            <h2 className={footerStyle.footerTitle}>
                Города
            </h2>

            {loader ? (
                <Loader />
            ) : error === 'connection_error' ? (
                <div className={mainStyle.card}>
                    <ConnectionError onRetry={fetchData} />
                </div>
            ) : error ? (
                <div className={mainStyle.mb20}>
                    <div className={mainStyle.errorText}>{error}</div>
                </div>
            ) : (
                <div className={footerStyle.cityList}>
                    {cities.map(city =>
                        city.slug ? (
                            <Link
                                key={city.id}
                                to={slugUrl(city.slug)}
                            >
                                {city.title}
                            </Link>
                        ) : (
                            <span key={city.id}>
                                {city.title}
                            </span>
                        )
                    )}
                </div>
            )}
        </div>
    )
}
