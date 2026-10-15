
import profileStyle from '../../styles/profileStyle.module.css'

type ProfileEmailProps = {
    email: string
}

export const ProfileEmail = ({ email }: ProfileEmailProps) => {
    return (
        <div className={profileStyle.row}>
            <span className={profileStyle.label}>Email</span>

            <div className={profileStyle.valueBlock}>
                <span className={profileStyle.value}>
                    {email}
                </span>
            </div>
        </div>
    )
}
