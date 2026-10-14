
import headerStyle from '../../styles/headerStyle.module.css'

export const HeaderTitle = ({ title }: { title: string }) => {
    return (
        <div>
            <span className={headerStyle.headerTitle}>{title}</span>
        </div>
    )
}
