
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

type ProfilePasswordProps = {
    setTemplate: Dispatch<SetStateAction<string | null>>
    setSuccess: Dispatch<SetStateAction<string | null>>
}

export const ProfilePassword = ({ setTemplate, setSuccess }: ProfilePasswordProps) => {
    return (
        <div className={profileStyle.row}>
            <span className={profileStyle.label}>Пароль</span>

            <div className={profileStyle.valueBlock}>
                <span className={profileStyle.value}>
                    ••••••••
                </span>

                <button
                    type="button"
                    className={mainStyle.plainButton}
                    onClick={() => {
                        setSuccess(null)
                        setTemplate('password')
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
