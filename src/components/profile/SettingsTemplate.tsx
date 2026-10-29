import type { Dispatch, SetStateAction } from 'react'

import profileStyle from '../../styles/profileStyle.module.css'
import formsStyle from '../../styles/formsStyle.module.css'

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
        <div className={profileStyle.settingsContent}>

            {success && (
                <div className={profileStyle.settingsSuccess} role="status">
                    <ProfileSuccess text={success} />
                </div>
            )}

            {user.email != null && (
                <>
                    <section className={profileStyle.settingsCard}>

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

                    </section>

                    <div className={formsStyle.blockButtonRow}>
                        <Logout />
                    </div>
                </>
            )}

        </div>
    )
}