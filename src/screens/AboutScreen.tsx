
import { useState, useEffect } from 'react'

import { FormattedContent } from '../components/common/FormattedContent'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ConnectionError } from '../components/common/ConnectionError'

import mainStyle from '../styles/mainStyle.module.css'
import aboutStyle from '../styles/aboutStyle.module.css'

import { Http } from '../scripts/http'
import { ROUTES } from '../routes'

type AboutPageData = {
    title: string | null
    content: unknown
}

export const AboutScreen = () => {

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [data, setData] = useState<AboutPageData>({
        title: null,
        content: null
    })

    const fetchData = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.get<AboutPageData>(
                `${import.meta.env.VITE_API_URL}/pages/about`
            )

            if (output.success == 1) {
                setData(output.data!)
            } else {
                if (output.error) {
                    setError(output.error)
                } else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loader) {
        return <Loader />
    }

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.scrollContent}>
                    <div className={aboutStyle.page}>

                        <Breadcrumbs
                            items={[
                                { label: 'Главная', to: ROUTES.HOME },
                                { label: data.title ?? '' }
                            ]}
                        />

                        {error === 'connection_error' ? (
                            <ConnectionError onRetry={fetchData} />
                        ) : error ? (
                            <Error text={error} />
                        ) : (
                            <article className={aboutStyle.article}>

                                <h1 className={aboutStyle.title}>
                                    {data.title}
                                </h1>

                                <div className={aboutStyle.content}>
                                    <FormattedContent text={data.content} />
                                </div>

                            </article>
                        )}

                    </div>
                </div>
            </main>

        </div>
    )
}
