
import { useState, useContext, type ReactNode } from 'react'

import mainStyle from '../styles/mainStyle.module.css'
import authStyle from '../styles/authStyle.module.css'

import { Email } from '../components/auth/Email'
import { Code } from '../components/auth/Code'
import { Password } from '../components/auth/Password'
import { CreateProfile } from '../components/auth/CreateProfile'
import { NewPassword } from '../components/auth/NewPassword'
import { AuthGoogle } from '../components/auth/AuthGoogle'

import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { PROFILE_SCREEN } from '../context/types'
import { MainContext } from '../context/mainContext'

export const AuthScreen = () => {

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { changeScreen, token } = useContext(MainContext)

    const [template, setTemplate] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [code, setCode] = useState<string | null>(null)

    let content: ReactNode = null

    switch (template) {
        case 'password':
            content = (
                <Password
                    email={email}
                    setError={setError}
                    changeScreen={changeScreen}
                    token={token}
                    screen={PROFILE_SCREEN}
                    setLoader={setLoader}
                />
            )
            break

        case 'createProfile':
            content = (
                <CreateProfile
                    email={email}
                    setTemplate={setTemplate}
                    setError={setError}
                    setLoader={setLoader}
                />
            )
            break

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
                    changeScreen={changeScreen}
                    setLoader={setLoader}
                    token={token}
                />
            )
            break

        default:
            content = (
                <div>
                    <Email
                        setEmail={setEmail}
                        setTemplate={setTemplate}
                        setError={setError}
                        setLoader={setLoader}
                    />
                    <AuthGoogle
                        token={token}
                        screen={PROFILE_SCREEN}
                        changeScreen={changeScreen}
                        setError={setError}
                        setLoader={setLoader}
                    />
                </div>
            )
            break
    }

    if (loader) return <Loader />

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            
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

        </div>
    )
}
