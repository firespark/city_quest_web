
import { MainState } from './context/MainState'
import { Layout } from './Layout'

function App() {
    return (
        <MainState>
            <Layout />
        </MainState>
    )
}

export default App
