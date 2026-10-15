
import { useState, useContext, type ReactNode } from 'react'

import mainStyle from '../styles/mainStyle.module.css'
import headerStyle from '../styles/headerStyle.module.css'
import authStyle from '../styles/authStyle.module.css'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { EmailReset } from '../components/auth/EmailReset'
import { Code } from '../components/auth/Code'
import { NewPassword } from '../components/auth/NewPassword'

import { Loader } from '../components/common/Loader'
import { Footer } from '../components/common/Footer'
import { Error } from '../components/common/Error'

import { MainContext } from '../context/mainContext'

export const PasswordResetScreen = () => {

    const { changeScreen, token } = useContext(MainContext)

    const [template, setTemplate] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [code, setCode] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loader, setLoader] = useState(false)

    let content: ReactNode = null

    switch (template) {
        case 'code':
            content = (
                <Code
                    email={email}
                    setTemplate={setTemplate}
                    setError={setError}
                    setCode={setCode}
                    setLoader={setLoader}
                    token={token}
                />
            )
            break

        case 'newPassword':
            content = (
                <NewPassword
                    email={email}
                    code={code}
                    setError={setError}
                    setLoader={setLoader}
                    changeScreen={changeScreen}
                    token={token}
                />
            )
            break

        default:
            content = (
                <EmailReset
                    setEmail={setEmail}
                    setTemplate={setTemplate}
                    setError={setError}
                    setLoader={setLoader}
                />
            )
            break
    }

    if (loader) return <Loader />

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <header className={`${mainStyle.panelRow} ${headerStyle.panelHeader}`}>
                <Back />
                <HeaderTitle title="Восстановление пароля" />
                <Menu />
            </header>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={authStyle.authScrollContent}>
                    {error && (
                        <div className={mainStyle.mb20}>
                            <Error text={error} />
                        </div>
                    )}

                    <div className={`${mainStyle.card} ${authStyle.authCardContent}`}>
                        {content}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
