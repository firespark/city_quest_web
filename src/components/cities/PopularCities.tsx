
import { useState, useEffect, useContext } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

import { PopularCity, type PopularCityData } from './PopularCity'

import { Loader } from '../common/Loader'
import { ConnectionError } from '../common/ConnectionError'

import { Http } from '../../scripts/http'
import { MainContext } from '../../context/mainContext'

export const PopularCities = () => {

    const { countryId } = useContext(MainContext)

    const [data, setData] = useState<PopularCityData[]>()
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {

        if (!countryId) return

        setError(null)
        setLoader(true)

        try {

            const url = `${import.meta.env.VITE_API_URL}/cities/featured?country_id=${countryId}`
            const output = await Http.get<PopularCityData[]>(url)

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
    }, [countryId])

    if (loader) {
        return <Loader />
    }

    if (error === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    if (error) {
        return (
            <div className={mainStyle.mb20}>
                <div className={mainStyle.errorText}>{error}</div>
            </div>
        )
    }

    return (
        <div className={mainStyle.container}>
            {data && data.map((item, index) => (
                <div key={item.id || index}>
                    <PopularCity city={item} />
                </div>
            ))}
        </div>
    )
}
