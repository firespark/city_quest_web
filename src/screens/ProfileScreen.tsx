
import { useState, useContext, useEffect, useCallback } from 'react'
import { IoPersonOutline } from 'react-icons/io5'

import mainStyle from '../styles/mainStyle.module.css'
import profileStyle from '../styles/profileStyle.module.css'

import { ROUTES } from '../routes'
import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ConnectionError } from '../components/common/ConnectionError'

import { Settings } from '../components/profile/Settings'
import { ProfileRegister } from '../components/profile/ProfileRegister'

import { OpenQuests } from '../components/quests/OpenQuests'
import { DoneQuests } from '../components/quests/DoneQuests'
import { PurchasedQuests } from '../components/quests/PurchasedQuests'

type ProfileUserData = {
    name: string | null
    email: string | null
    notes: number
    vk_id?: number | string | null
    yandex_id?: number | string | null
    [key: string]: unknown
}

export const ProfileScreen = () => {

    const { token } = useContext(MainContext)

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    const [user, setUser] = useState<ProfileUserData>({
        name: 'Путешественник',
        email: null,
        notes: 0
    })

    const fetchData = useCallback(async () => {
        if (!token) {
            setLoader(false)
            return
        }

        setLoadError(null)
        setLoader(true)

        try {
            const output = await Http.get<ProfileUserData>(
                `${import.meta.env.VITE_API_URL}/users/get`,
                token
            )

            if (output.success === 1 && output.data) {
                setUser({
                    ...output.data,
                    name: output.data.name?.trim() || 'Путешественник'
                })
            } else if (output.error === 'connection_error') {
                setLoadError('connection_error')
            }

        } catch (e) {
            console.error('Error:', e)
            setLoadError('connection_error')
        } finally {
            setLoader(false)
        }
    }, [token])

    useEffect(() => {
        void fetchData()
    }, [fetchData])

    const isAuthenticated = Boolean(
        user.email || user.vk_id || user.yandex_id
    )

    if (loader) return <Loader />

    if (loadError === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    if (loadError) return <Error text={loadError} />

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={profileStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: ROUTES.HOME },
                            { label: 'Профиль' }
                        ]}
                    />

                    <h1 className={profileStyle.pageTitle}>
                        Профиль
                    </h1>

                    <section className={profileStyle.accountCard}>

                        <div className={profileStyle.accountIcon} aria-hidden="true">
                            <IoPersonOutline size={30} />
                        </div>

                        <div className={profileStyle.accountDetails}>

                            <div className={profileStyle.accountName}>
                                {user.name}
                            </div>

                            {user.email && (
                                <div className={profileStyle.accountEmail}>
                                    {user.email}
                                </div>
                            )}

                        </div>

                        {user.email && (
                            <div className={profileStyle.accountSettings}>
                                <Settings />
                            </div>
                        )}

                    </section>

                    {!isAuthenticated && <ProfileRegister />}

                    <div className={profileStyle.questSections}>

                        <section className={profileStyle.questPanel}>
                            <OpenQuests />
                        </section>

                        <section className={profileStyle.questPanel}>
                            <DoneQuests />
                        </section>

                        {isAuthenticated && (
                            <section className={`${profileStyle.questPanel} ${profileStyle.questPanelWide}`}>
                                <PurchasedQuests />
                            </section>
                        )}

                    </div>

                </div>

            </main>

        </div>
    )
}
