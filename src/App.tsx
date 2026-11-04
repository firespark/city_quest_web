
import { BrowserRouter, useLocation } from 'react-router-dom'

import { MainState } from './context/MainState'
import { Layout } from './Layout'
import { LayoutMeta } from './LayoutMeta'

import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { ConnectionErrorContent, ConnectionErrorProvider } from './components/common/ConnectionError'

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
        <ConnectionErrorProvider>
            <div className={mainStyle.siteLayout}>
                <Header />

                <div className={mainStyle.siteContent}>
                    <ConnectionErrorContent>
                        <Layout />
                    </ConnectionErrorContent>
                </div>

                <Footer active={active} />
            </div>
        </ConnectionErrorProvider>
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
