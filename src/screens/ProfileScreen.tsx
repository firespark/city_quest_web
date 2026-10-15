
import { useState, useContext, useEffect } from 'react'

import mainStyle from '../styles/mainStyle.module.css'
import headerStyle from '../styles/headerStyle.module.css'
import profileStyle from '../styles/profileStyle.module.css'

import { Back } from '../components/common/Back'
import { Menu } from '../components/common/Menu'
import { Settings } from '../components/profile/Settings'
import { ProfileRegister } from '../components/profile/ProfileRegister'
import { OpenQuests } from '../components/quests/OpenQuests'
import { DoneQuests } from '../components/quests/DoneQuests'
import { PurchasedQuests } from '../components/quests/PurchasedQuests'
import { Footer } from '../components/common/Footer'
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

export const ProfileScreen = () => {

    const [loader, setLoader] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)
    const { token } = useContext(MainContext)

    const [user, setUser] = useState<ProfileUserData>({
        name: 'Путешественник',
        email: null,
        notes: 0
    })

    const fetchData = async () => {
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

            if (output.success == 1) {
                setUser(prev => ({
                    ...output.data!,
                    name: (output.data!.name && output.data!.name.trim() !== '')
                        ? output.data!.name
                        : prev.name
                }))
            } else if (output.error === 'connection_error') {
                setLoadError('connection_error')
            }

        } catch (e) {
            console.error('Error:', e)
            setLoadError('connection_error')
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [token])

    if (loader) return <Loader />

    if (loadError === 'connection_error') {
        return <ConnectionError onRetry={fetchData} />
    }

    if (loadError) return <Error text={loadError} />

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <header className={headerStyle.panelHeader}>
                <Back />
                <Menu />
            </header>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.container}>

                    <div className={`${mainStyle.card} ${profileStyle.profileHeaderCard}`}>
                        <div className={profileStyle.profileNameRow}>
                            <div className={profileStyle.profileUserName}>
                                {user.name}
                            </div>

                            {user.email && <Settings />}
                        </div>
                    </div>

                    {!user.email && <ProfileRegister />}

                    <div className={mainStyle.card}>
                        <OpenQuests />
                    </div>

                    <div className={mainStyle.card}>
                        <DoneQuests />
                    </div>

                    {user.email && (
                        <div className={mainStyle.card}>
                            <PurchasedQuests />
                        </div>
                    )}
                </div>
            </main>

            <Footer active="profile" />
        </div>
    )
}
