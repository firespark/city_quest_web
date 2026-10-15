
import mainStyle from '../../styles/mainStyle.module.css'

export const Error = ({ text }: { text: string }) => {

    return (
        <div>
            <div className={`${mainStyle.red} ${mainStyle.mb10}`}>
                {text}
            </div>
        </div>
    )
}
