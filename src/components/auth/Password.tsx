
import { useState, type Dispatch, type SetStateAction } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

import { PasswordForgot } from './PasswordForgot'

import mainStyle from '../../styles/mainStyle.module.css'
import authStyle from '../../styles/authStyle.module.css'
import formsStyle from '../../styles/formsStyle.module.css'

import { Http } from '../../scripts/http'

type PasswordProps = {
    email: string | null
    setError: Dispatch<SetStateAction<string | null>>
    changeScreen: (screen: string) => void
    token: string
    screen: string
    setLoader: Dispatch<SetStateAction<boolean>>
}

export const Password = ({
    email,
    setError,
    changeScreen,
    token,
    screen,
    setLoader
}: PasswordProps) => {

    const [input, setInput] = useState<string | null>(null)
    const [errorStyle, setErrorStyle] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const checkPassword = async () => {
        setLoader(true)
        setError(null)
        setErrorStyle(false)

        if (!input) {
            setErrorStyle(true)
            setError('Введите пароль')
            setLoader(false)
            return
        }

        try {
            const output = await Http.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                { email, password: input },
                token
            )

            if (output.success == 1) {
                changeScreen(screen)
            } else {
                setErrorStyle(true)
                setError(output.error || 'Неверный пароль')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Ошибка сети')
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className={authStyle.authStep}>

            <div className={`${mainStyle.formTitle} ${mainStyle.mb10} ${mainStyle.textCenter}`}>
                С возвращением!
            </div>

            <div className={`${mainStyle.formSubtitle} ${mainStyle.mb25}`}>
                Введи пароль для {email}:
            </div>

            <div className={authStyle.passwordField}>

                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Пароль"
                    aria-label="Пароль"
                    className={`
                        ${formsStyle.blockInput}
                        ${authStyle.eyePadding}
                        ${errorStyle ? formsStyle.blockInputInvalid : ''}
                    `}
                    onChange={(event) => setInput(event.target.value)}
                    autoCapitalize="none"
                />

                <button
                    type="button"
                    className={`${mainStyle.plainButton} ${authStyle.eyeSign}`}
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <IoEyeOffOutline size={22} />
                    ) : (
                        <IoEyeOutline size={22} />
                    )}
                </button>

            </div>

            <div className={formsStyle.blockButtonRow}>
                <button
                    type="button"
                    className={mainStyle.siteButton}
                    onClick={checkPassword}
                >
                    Войти
                </button>
            </div>

            <PasswordForgot />

        </div>
    )
}
