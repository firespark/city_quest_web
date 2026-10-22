
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

import type { FeaturedQuestData } from './FeaturedQuests'

export const useFeaturedQuests = () => {
    const { token } = useContext(MainContext)

    const [data, setData] = useState<FeaturedQuestData[]>([])
    const [loader, setLoader] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const requestedToken = useRef<string | null>(null)

    const fetchData = useCallback(async () => {
        setError(null)
        setLoader(true)

        try {
            const url = `${import.meta.env.VITE_API_URL}/quests/featured`
            const output = await Http.get<FeaturedQuestData[]>(url, token)

            if (output.success == 1 && Array.isArray(output.data)) {
                setData(output.data)
            } else {
                setError(
                    output.error ||
                    'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом'
                )
            }
        } catch (e) {
            console.error('Error:', e)
            setError('connection_error')
        } finally {
            setLoader(false)
        }
    }, [token])

    useEffect(() => {
        if (requestedToken.current === token) return

        requestedToken.current = token
        void fetchData()
    }, [fetchData, token])

    return { data, loader, error, fetchData }
}
