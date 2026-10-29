import { useState, useContext, useEffect, useCallback } from 'react'

import mainStyle from '../styles/mainStyle.module.css'
import profileStyle from '../styles/profileStyle.module.css'

import { ROUTES } from '../routes'
import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ConnectionError } from '../components/common/ConnectionError'

import { EditTemplate } from '../components/profile/EditTemplate'
import { SettingsTemplate } from '../components/profile/SettingsTemplate'

type ProfileUserData = {
    name: string | null
    email: string | null
    notes: number
    [key: string]: unknown
}

export const ProfileSettingsScreen = () => {

    const { token } = useContext(MainContext)

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    const [template, setTemplate] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [user, setUser] = useState<ProfileUserData>({
        name: null,
        email: null,
        notes: 0
    })

    const fetchData = useCallback(async () => {
        setLoadError(null)
        setLoader(true)

        try {
            const output = await Http.get<ProfileUserData>(
                `${import.meta.env.VITE_API_URL}/users/get`,
                token
            )

            if (output.success === 1 && output.data) {
                setUser(output.data)
            } else if (output.error === 'connection_error') {
                setLoadError('connection_error')
            } else {
                setLoadError(
                    'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом'
                )
            }

        } catch (e) {
            console.error('Error:', e)
            setLoadError(
                'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом'
            )
        } finally {
            setLoader(false)
        }
    }, [token])

    useEffect(() => {
        void fetchData()
    }, [fetchData])

    if (loader) {
        return <Loader />
    }

    if (loadError === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    if (loadError) {
        return <Error text={loadError} />
    }

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={profileStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: ROUTES.HOME },
                            { label: 'Профиль', to: ROUTES.PROFILE },
                            { label: 'Настройки профиля' }
                        ]}
                    />

                    <h1 className={profileStyle.pageTitle}>
                        Настройки профиля
                    </h1>

                    {template ? (
                        <EditTemplate
                            user={user}
                            setUser={setUser}
                            template={template}
                            setTemplate={setTemplate}
                            setSuccess={setSuccess}
                        />
                    ) : (
                        <SettingsTemplate
                            user={user}
                            setUser={setUser}
                            setTemplate={setTemplate}
                            success={success}
                            setSuccess={setSuccess}
                        />
                    )}

                </div>

            </main>

        </div>
    )
}