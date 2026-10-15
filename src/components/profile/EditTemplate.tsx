
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import { TemplateClose } from './TemplateClose'

import { ProfileNameEdit } from './ProfileNameEdit'
import { ProfilePasswordEdit } from './ProfilePasswordEdit'

import mainStyle from '../../styles/mainStyle.module.css'
import headerStyle from '../../styles/headerStyle.module.css'

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
        <div
            className={mainStyle.flex}
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
            }}
        >
            <header className={`${mainStyle.panelRowRight} ${headerStyle.panelHeader}`}>
                <TemplateClose setTemplate={setTemplate} />
            </header>

            <div className={`${mainStyle.flex} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.container}>
                    {content}
                </div>
            </div>
        </div>
    )
}
