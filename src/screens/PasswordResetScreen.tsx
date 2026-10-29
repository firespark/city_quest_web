import { useState, useContext, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import mainStyle from '../styles/mainStyle.module.css'
import authStyle from '../styles/authStyle.module.css'

import { ROUTES } from '../routes'
import { MainContext } from '../context/mainContext'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { EmailReset } from '../components/auth/EmailReset'
import { Code } from '../components/auth/Code'
import { NewPassword } from '../components/auth/NewPassword'

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

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={authStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: ROUTES.HOME },
                            { label: 'Вход и регистрация', to: ROUTES.AUTH },
                            { label: 'Восстановление пароля' }
                        ]}
                    />

                    <h1 className={authStyle.pageTitle}>
                        Восстановление пароля
                    </h1>

                    <div className={authStyle.authScrollContent}>

                        {error && (
                            <div
                                className={mainStyle.mb20}
                                role="alert"
                            >
                                <Error text={error} />
                            </div>
                        )}

                        <div
                            className={authStyle.authCardContent}
                            aria-busy={loader}
                        >

                            {loader && <Loader />}

                            <div hidden={loader}>
                                {content}
                            </div>

                        </div>

                        <div className={authStyle.secondaryAction}>

                            <Link
                                to={ROUTES.AUTH}
                                className={mainStyle.link}
                            >
                                Вернуться ко входу
                            </Link>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    )
}