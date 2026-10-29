
import { useState, useEffect } from 'react'

import mainStyle from '../styles/mainStyle.module.css'
import howPlayStyle from '../styles/howPlayStyle.module.css'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ConnectionError } from '../components/common/ConnectionError'
import { HowPlayBlockBlue } from '../components/howPlay/HowPlayBlockBlue'
import { HowPlayBlock } from '../components/howPlay/HowPlayBlock'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { Http } from '../scripts/http'
import { ROUTES } from '../routes'

type HowPlayData = {
    title: string | null
    content: unknown
    playTitle1: string | null
    playTitle2: string | null
    playTitle3: string | null
    playContent1: string | null
    playContent2: string | null
    playContent3: string | null
    playTitle4?: string | null
    playTitle5?: string | null
    playContent4?: string | null
    playContent5?: string | null
}

export const HowPlayScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    const [data, setData] = useState<HowPlayData>({
        title: null,
        content: null,
        playTitle1: null,
        playTitle2: null,
        playTitle3: null,
        playContent1: null,
        playContent2: null,
        playContent3: null
    })

    const fetchData = async () => {
        setLoadError(null)
        setLoader(true)

        try {
            const output = await Http.get<HowPlayData>(
                `${import.meta.env.VITE_API_URL}/pages/howPlay`
            )

            if (output.success == 1) {
                setData(output.data!)
            } else {
                if (output.error) {
                    setLoadError(output.error)
                } else {
                    setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        } catch (e) {
            console.error('Error:', e)
            setLoadError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
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

    if (loadError === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    if (loadError) {
        return <Error text={loadError} />
    }

    const getCleanRules = (contentArray: unknown): string[] => {
        if (!Array.isArray(contentArray)) {
            return []
        }

        return contentArray
            .map((item: unknown) => {
                if (typeof item !== 'string') return ''

                const cleanText = item
                    .replace(/[\n\r]/g, '')
                    .replace(/<[^>]*>?/gm, '')
                    .replace(/^[-—–]\s*/, '')

                return cleanText.trim()
            })
            .filter((item: string) => item.length > 0)
    }

    const rulesList = getCleanRules(data.content)

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={mainStyle.scrollContent}>

                    <div className={howPlayStyle.page}>

                        <Breadcrumbs
                            items={[
                                { label: 'Главная', to: ROUTES.HOME },
                                { label: data.title ?? '' }
                            ]}
                        />

                        <article className={howPlayStyle.article}>

                            <h1 className={howPlayStyle.title}>
                                {data.title}
                            </h1>

                            <div className={howPlayStyle.stepsGrid}>

                                {(data.playTitle1 || data.playContent1) && (
                                    <HowPlayBlockBlue
                                        number="1"
                                        title={data.playTitle1}
                                        description={data.playContent1}
                                    />
                                )}

                                {(data.playTitle2 || data.playContent2) && (
                                    <HowPlayBlock
                                        number="2"
                                        title={data.playTitle2}
                                        description={data.playContent2}
                                    />
                                )}

                                {(data.playTitle3 || data.playContent3) && (
                                    <HowPlayBlockBlue
                                        number="3"
                                        title={data.playTitle3}
                                        description={data.playContent3}
                                    />
                                )}

                                {(data.playTitle4 || data.playContent4) && (
                                    <HowPlayBlock
                                        number="4"
                                        title={data.playTitle4}
                                        description={data.playContent4}
                                    />
                                )}

                                {(data.playTitle5 || data.playContent5) && (
                                    <HowPlayBlockBlue
                                        number="5"
                                        title={data.playTitle5}
                                        description={data.playContent5}
                                    />
                                )}

                            </div>

                            {rulesList.length > 0 && (
                                <section className={howPlayStyle.rulesContainer}>

                                    <h2 className={howPlayStyle.rulesMainTitle}>
                                        Важно знать
                                    </h2>

                                    <div className={howPlayStyle.rulesList}>

                                        {rulesList.map((rule, index) => (
                                            <div
                                                key={index}
                                                className={howPlayStyle.ruleRow}
                                            >
                                                <div
                                                    className={howPlayStyle.ruleBullet}
                                                    aria-hidden="true"
                                                >
                                                    <div className={howPlayStyle.ruleBulletInner} />
                                                </div>

                                                <div className={howPlayStyle.ruleText}>
                                                    {rule}
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                </section>
                            )}

                        </article>

                    </div>

                </div>

            </main>

        </div>
    )
}
