
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import headerStyle from '../../styles/headerStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

import { Back } from '../common/Back'
import { HeaderTitle } from '../common/HeaderTitle'
import { Menu } from '../common/Menu'

import { ProfileEmail } from './ProfileEmail'
import { ProfileName } from './ProfileName'
import { ProfilePassword } from './ProfilePassword'
import { ProfileSuccess } from './ProfileSuccess'
import { Logout } from './Logout'

type ProfileUserData = {
    name: string | null
    email: string | null
    notes: number
    [key: string]: unknown
}

type SettingsTemplateProps = {
    user: ProfileUserData
    setUser: Dispatch<SetStateAction<ProfileUserData>>
    setTemplate: Dispatch<SetStateAction<string | null>>
    success: string | null
    setSuccess: Dispatch<SetStateAction<string | null>>
}

export const SettingsTemplate = ({
    user,
    setTemplate,
    success,
    setSuccess
}: SettingsTemplateProps) => {

    return (
        <div
            className={mainStyle.flex}
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
            }}
        >
            <header className={`${mainStyle.panelRow} ${headerStyle.panelHeader}`}>
                <Back />
                <HeaderTitle title="Настройки" />
                <Menu />
            </header>

            <main className={`${mainStyle.flex} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.container}>

                    {success && <ProfileSuccess text={success} />}

                    {user.email != null && (
                        <div className={profileStyle.card}>
                            <ProfileEmail email={user.email} />

                            <ProfileName
                                name={user.name}
                                setTemplate={setTemplate}
                                setSuccess={setSuccess}
                            />

                            <ProfilePassword
                                setTemplate={setTemplate}
                                setSuccess={setSuccess}
                            />
                        </div>
                    )}

                    {user.email != null && <Logout />}

                </div>
            </main>
        </div>
    )
}
