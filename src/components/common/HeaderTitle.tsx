
import headerStyle from '../../styles/headerStyle.module.css'
import mainStyle from '../../styles/mainStyle.module.css'

export const HeaderTitle = ({ title }: { title: string }) => {
    return (
        <div>
            <span className={`${headerStyle.headerTitle} ${mainStyle.heading}`}>{title}</span>
        </div>
    )
}
