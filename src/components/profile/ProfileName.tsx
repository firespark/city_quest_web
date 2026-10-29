
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

type ProfileNameProps = {
    name: string | null
    setTemplate: Dispatch<SetStateAction<string | null>>
    setSuccess: Dispatch<SetStateAction<string | null>>
}

export const ProfileName = ({ name, setTemplate, setSuccess }: ProfileNameProps) => {
    return (
        <div className={profileStyle.row}>
            <span className={profileStyle.label}>Имя</span>

            <div className={profileStyle.valueBlock}>
                <span className={profileStyle.value}>
                    {name}
                </span>

                <button
                    type="button"
                    className={`${mainStyle.siteButton} ${mainStyle.siteButtonSmall}`}
                    onClick={() => {
                        setSuccess(null)
                        setTemplate('name')
                    }}
                >
                    Изменить
                </button>
            </div>
        </div>
    )
}
