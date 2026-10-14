
import mainStyle from '../../styles/mainStyle.module.css'
import headerStyle from '../../styles/headerStyle.module.css'
import logoImage from '../../../assets/img/logo-fun-black.png'

export const Logo = () => {
    return (
        <div className={mainStyle.panelRowLeft}>
            <img src={logoImage} className={headerStyle.logoImage} alt="" />
            <span className={headerStyle.logoTitle}>Гагара Тур</span>
        </div>
    )
}
