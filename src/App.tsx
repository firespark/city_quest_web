
import { BrowserRouter, useLocation } from 'react-router-dom'

import { MainState } from './context/MainState'
import { Layout } from './Layout'
import { LayoutMeta } from './LayoutMeta'

import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'

import { ROUTES } from './routes'
import mainStyle from './styles/mainStyle.module.css'

const AppContent = () => {
    const { pathname } = useLocation()

    const active = pathname === ROUTES.HOME
        ? 'home'
        : pathname === ROUTES.HOW_PLAY
            ? 'question'
            : pathname === ROUTES.PROFILE
                ? 'profile'
                : undefined

    return (
        <div className={mainStyle.siteLayout}>
            <Header />

            <div className={mainStyle.siteContent}>
                <Layout />
            </div>

            <Footer active={active} />
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <LayoutMeta />
            <MainState>
                <AppContent />
            </MainState>
        </BrowserRouter>
    )
}

export default App
