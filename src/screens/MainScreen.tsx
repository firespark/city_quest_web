
import mainStyle from '../styles/mainStyle.module.css'

import { Hero } from '../components/main/Hero'

export const MainScreen = () => {
    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <Hero />
            </main>
        </div>
    )
}
