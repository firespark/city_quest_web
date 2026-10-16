
import { BrowserRouter } from 'react-router-dom'

import { MainState } from './context/MainState'
import { Layout } from './Layout'
import { LayoutMeta } from './LayoutMeta'

function App() {
    return (
        <BrowserRouter>
            <LayoutMeta />
            <MainState>
                <Layout />
            </MainState>
        </BrowserRouter>
    )
}

export default App
