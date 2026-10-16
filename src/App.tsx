
import { BrowserRouter } from 'react-router-dom'

import { MainState } from './context/MainState'
import { Layout } from './Layout'

function App() {
    return (
        <BrowserRouter>
            <MainState>
                <Layout />
            </MainState>
        </BrowserRouter>
    )
}

export default App
