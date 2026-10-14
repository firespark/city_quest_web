
import mainStyle from '../../styles/mainStyle.module.css'

export const Loader = () => {
    return (
        <div className={mainStyle.loaderOverlay} role="status">
            <div className={mainStyle.loaderSpinner} aria-hidden="true" />
            <span className={mainStyle.loaderText}>Загрузка</span>
        </div>
    )
}
