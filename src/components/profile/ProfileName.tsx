
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
                    className={mainStyle.plainButton}
                    onClick={() => {
                        setSuccess(null)
                        setTemplate('name')
                    }}
                >
                    <span className={profileStyle.actionText}>
                        Изменить
                    </span>
                </button>
            </div>
        </div>
    )
}
