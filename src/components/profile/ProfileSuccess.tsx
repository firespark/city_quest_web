
import mainStyle from '../../styles/mainStyle.module.css'

type ProfileSuccessProps = {
    text: string
}

export const ProfileSuccess = ({ text }: ProfileSuccessProps) => {
    return (
        <div className={`${mainStyle.description} ${mainStyle.textThin} ${mainStyle.mb8}`}>
            <span className={mainStyle.blue}>
                {text}
            </span>
        </div>
    )
}
