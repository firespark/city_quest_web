import { useCallback, useContext, useEffect, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'

import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'
import { ROUTES, purchaseUrl, slugUrl } from '../routes'
import type { QuestScreenData } from './QuestScreen'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { AppDownloads } from '../components/common/AppDownloads'
import { Socials } from '../components/common/Socials'
import { Loader } from '../components/common/Loader'
import { ConnectionError } from '../components/common/ConnectionError'
import { Error } from '../components/common/Error'
import { NotFoundScreen } from './NotFoundScreen'

import mainStyle from '../styles/mainStyle.module.css'
import purchaseStyle from '../styles/purchaseStyle.module.css'

type PurchaseQuest = QuestScreenData & { coming_soon: boolean }
type PurchaseUser = { email: string | null }

export const PurchaseScreen = () => {
    const { token } = useContext(MainContext)
    const [searchParams] = useSearchParams()
    const slug = searchParams.get('quest')
    const [quest, setQuest] = useState<PurchaseQuest | null>(null)
    const [user, setUser] = useState<PurchaseUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [retry, setRetry] = useState(0)
    const retryLoad = useCallback(() => setRetry(value => value + 1), [])

    useEffect(() => {
        if (!slug) return
        let active = true

        const load = async () => {
            setLoading(true)
            setError(null)
            const output = await Http.get<PurchaseQuest>(
                `${import.meta.env.VITE_API_URL}/quests/bySlug/${encodeURIComponent(slug)}`, token
            )
            if (!active) return
            if (output.success !== 1 || !output.data) {
                setQuest(null)
                setError(output.error?.trim().toLowerCase() === 'not found' ? null : output.error ?? null)
                setLoading(false)
                return
            }
            const data = output.data
            setQuest(data)
            if (data.is_auth && data.paid && !data.available && !data.coming_soon) {
                const account = await Http.get<PurchaseUser>(`${import.meta.env.VITE_API_URL}/users/get`, token)
                if (!active) return
                if (account.error === 'connection_error') setError(account.error)
                setUser(account.success === 1 ? account.data ?? null : null)
            } else {
                setUser(null)
            }
            setLoading(false)
        }

        void load()
        return () => { active = false }
    }, [slug, token, retry])

    if (!slug) return <NotFoundScreen />
    if (loading) return <Loader />
    if (error === 'connection_error') return <ConnectionError onRetry={retryLoad} />
    if (error) return <Error text={error} />
    if (!quest) return <NotFoundScreen />
    if (!quest.paid || quest.available || quest.coming_soon) return <Navigate to={slugUrl(quest.slug)} replace />

    const authUrl = `${ROUTES.AUTH}?${new URLSearchParams({ returnTo: purchaseUrl(quest.slug) })}`

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll} ${mainStyle.scrollArea}`}>
                <div className={mainStyle.sitePage}>
                    <Breadcrumbs items={[
                        { label: 'Главная', to: ROUTES.HOME },
                        { label: quest.city, to: slugUrl(quest.city_slug) },
                        { label: quest.title, to: slugUrl(quest.slug) },
                        { label: 'Покупка квеста' },
                    ]} />
                    <h1>Покупка квеста</h1>
                    <div className={purchaseStyle.questName}>{quest.title}</div>
                    <div className={mainStyle.bodyText}>Квесты проходят только в мобильном приложении Гагара Тур. Выбери удобный способ покупки.</div>

                    <div className={purchaseStyle.options}>
                        <div className={purchaseStyle.option}>
                            <div className={mainStyle.formTitle}>Оплата в рублях</div>
                            <p>Скачай приложение из RuStore и купи квест в приложении.</p>
                            <AppDownloads store="rustore" />
                        </div>
                        <div className={purchaseStyle.option}>
                            <div className={mainStyle.formTitle}>Оплата в лари или долларах</div>
                            <p>Пока оплата на сайте недоступна. {user ? 'Отправь' : 'Авторизуйся и отправь'} нам в любую соцсеть email своего аккаунта и название квеста. Мы свяжемся с тобой и поможем с покупкой.</p>
                            <AppDownloads store="googlePlay" />
                            {user ? (
                                <div className={purchaseStyle.account}>
                                    {user.email && <p>Твой email: <strong>{user.email}</strong></p>}
                                    <p>Квест: <strong>{quest.title}</strong></p>
                                    <Socials className={purchaseStyle.socials} />
                                </div>
                            ) : (
                                <>
                                    <Link to={authUrl} className={mainStyle.siteButton}>Войти или зарегистрироваться</Link>
                                    <Socials className={purchaseStyle.socials} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
