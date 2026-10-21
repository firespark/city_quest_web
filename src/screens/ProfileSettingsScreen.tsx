
import { useState, useContext, useEffect } from 'react'

import mainStyle from '../styles/mainStyle.module.css'

import { EditTemplate } from '../components/profile/EditTemplate'
import { SettingsTemplate } from '../components/profile/SettingsTemplate'

import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'
import { ConnectionError } from '../components/common/ConnectionError'

import { MainContext } from '../context/mainContext'
import { Http } from '../scripts/http'

type ProfileUserData = {
    name: string | null
    email: string | null
    notes: number
    [key: string]: unknown
}

export const ProfileSettingsScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    const { token } = useContext(MainContext)

    const [template, setTemplate] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [user, setUser] = useState<ProfileUserData>({
        name: null,
        email: null,
        notes: 0
    })

    const fetchData = async () => {
        setLoadError(null)
        setLoader(true)

        try {
            const output = await Http.get<ProfileUserData>(
                `${import.meta.env.VITE_API_URL}/users/get`,
                token
            )

            if (output.success == 1) {
                setUser(output.data!)
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

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <main
                className={mainStyle.flex}
                style={{
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
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
            </main>

        </div>
    )
}
