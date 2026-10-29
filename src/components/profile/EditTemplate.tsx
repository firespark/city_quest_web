import type { Dispatch, SetStateAction, ReactNode } from 'react'

import profileStyle from '../../styles/profileStyle.module.css'

import { TemplateClose } from './TemplateClose'
import { ProfileNameEdit } from './ProfileNameEdit'
import { ProfilePasswordEdit } from './ProfilePasswordEdit'

type ProfileUserData = {
    name: string | null
    email: string | null
    notes: number
    [key: string]: unknown
}

type EditTemplateProps = {
    user: ProfileUserData
    setUser: Dispatch<SetStateAction<ProfileUserData>>
    template: string
    setTemplate: Dispatch<SetStateAction<string | null>>
    setSuccess: Dispatch<SetStateAction<string | null>>
}

export const EditTemplate = ({
    user,
    setUser,
    template,
    setTemplate,
    setSuccess
}: EditTemplateProps) => {

    let content: ReactNode = null

    switch (template) {
        case 'name':
            content = (
                <ProfileNameEdit
                    user={user}
                    setUser={setUser}
                    setTemplate={setTemplate}
                    setSuccess={setSuccess}
                />
            )
            break

        case 'password':
            content = (
                <ProfilePasswordEdit
                    setTemplate={setTemplate}
                    setSuccess={setSuccess}
                />
            )
            break
    }

    return (
        <section className={`${profileStyle.settingsContent} ${profileStyle.settingsCard}`}>

            <div className={profileStyle.editHeader}>

                <h2 className={profileStyle.editTitle}>
                    {template === 'name' ? 'Изменить имя' : 'Изменить пароль'}
                </h2>

                <TemplateClose setTemplate={setTemplate} />

            </div>

            {content}

        </section>
    )
}