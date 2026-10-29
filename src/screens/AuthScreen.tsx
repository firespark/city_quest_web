
import {
    useState,
    useContext,
    useEffect,
    useCallback,
    type ReactNode
} from 'react'

import { Navigate } from 'react-router-dom'

import mainStyle from '../styles/mainStyle.module.css'
import authStyle from '../styles/authStyle.module.css'

import { ROUTES } from '../routes'
import { Http } from '../scripts/http'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ConnectionError } from '../components/common/ConnectionError'
import { Loader } from '../components/common/Loader'
import { Error } from '../components/common/Error'

import { Email } from '../components/auth/Email'
import { Code } from '../components/auth/Code'
import { Password } from '../components/auth/Password'
import { CreateProfile } from '../components/auth/CreateProfile'
import { NewPassword } from '../components/auth/NewPassword'

import { PROFILE_SCREEN } from '../context/types'
import { MainContext } from '../context/mainContext'


type AuthUserData = {
    email: string | null
    vk_id?: number | string | null
    yandex_id?: number | string | null
}

type AuthStatus =
    | 'checking'
    | 'guest'
    | 'authenticated'
    | 'connection_error'


export const AuthScreen = () => {

    const { changeScreen, token } = useContext(MainContext)

    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking')

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [template, setTemplate] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [code, setCode] = useState<string | null>(null)


    // Проверяем, авторизован ли пользователь

    const checkAuth = useCallback(async () => {
        setAuthStatus('checking')

        try {
            const output = await Http.get<AuthUserData>(
                `${import.meta.env.VITE_API_URL}/users/get`,
                token
            )

            if (output.error === 'connection_error') {
                setAuthStatus('connection_error')
                return
            }

            const user = output.success === 1
                ? output.data
                : null

            const isAuthenticated = Boolean(
                user?.email ||
                user?.vk_id ||
                user?.yandex_id
            )

            setAuthStatus(
                isAuthenticated ? 'authenticated' : 'guest'
            )

        } catch (error) {
            console.error('Error checking authorization:', error)
            setAuthStatus('connection_error')
        }
    }, [token])


    useEffect(() => {
        void checkAuth()
    }, [checkAuth])


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
                <Email
                    setEmail={setEmail}
                    setTemplate={setTemplate}
                    setError={setError}
                    setLoader={setLoader}
                />
            )
            break
    }


    if (authStatus === 'checking' || loader) {
        return <Loader />
    }

    if (authStatus === 'connection_error') {
        return <ConnectionError onRetry={checkAuth} />
    }

    if (authStatus === 'authenticated') {
        return <Navigate to={ROUTES.PROFILE} replace />
    }


    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={authStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: ROUTES.HOME },
                            { label: 'Вход и регистрация' }
                        ]}
                    />

                    <h1 className={authStyle.pageTitle}>
                        Вход и регистрация
                    </h1>

                    <div className={authStyle.authScrollContent}>

                        {error && (
                            <div className={mainStyle.mb20}>
                                <Error text={error} />
                            </div>
                        )}

                        <div className={authStyle.authCardContent}>
                            {content}
                        </div>

                    </div>

                </div>

            </main>

        </div>
    )
}
