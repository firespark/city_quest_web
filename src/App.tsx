
import mainStyle from './styles/mainStyle.module.css'
import headerStyle from './styles/headerStyle.module.css'
import footerStyle from './styles/footerStyle.module.css'

function App() {
  return (
    <>
      <header className={headerStyle.panelHeader}>
      </header>

      <main className={mainStyle.pageBackground}>
        <div className={mainStyle.welcomeBlock}>
          <h1 className={mainStyle.welcomeTitle}>
            Куда отправимся?
          </h1>
          <p className={mainStyle.welcomeSubtitle}>
            Выберите город для ваших приключений
          </p>
        </div>
      </main>

      <footer className={footerStyle.footerPanel}>
      </footer>
    </>
  )
}

export default App
