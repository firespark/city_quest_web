
import { useState, type Dispatch, type SetStateAction } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

import mainStyle from '../../styles/mainStyle.module.css'
import authStyle from '../../styles/authStyle.module.css'
import formsStyle from '../../styles/formsStyle.module.css'

import { PROFILE_SCREEN } from '../../context/types'
import { Http } from '../../scripts/http'

type NewPasswordProps = {
    email: string | null
    code: string | null
    setError: Dispatch<SetStateAction<string | null>>
    changeScreen: (screen: string) => void
    setLoader: Dispatch<SetStateAction<boolean>>
    token: string
}

export const NewPassword = ({
    email,
    code,
    setError,
    changeScreen,
    setLoader,
    token
}: NewPasswordProps) => {

    const [input, setInput] = useState<string | null>(null)
    const [confirmInput, setConfirmInput] = useState<string | null>(null)

    const [inputClass, setInputClass] = useState<string | null>(null)
    const [confirmClass, setConfirmClass] = useState<string | null>(null)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const changePassword = async () => {

        setLoader(true)
        setError(null)
        setInputClass(null)
        setConfirmClass(null)

        if (!input || input.length < 8) {
            setInputClass(formsStyle.blockInputInvalid)
            setError('Пароль должен содержать минимум 8 символов')
            setLoader(false)
            return
        }

        if (!confirmInput) {
            setConfirmClass(formsStyle.blockInputInvalid)
            setLoader(false)
            return
        }

        if (input !== confirmInput) {
            setInputClass(formsStyle.blockInputInvalid)
            setConfirmClass(formsStyle.blockInputInvalid)
            setError('Пароли не совпадают')
            setLoader(false)
            return
        }

        const postdata = { email: email, code: code, password: input }

        try {
            const output = await Http.post(
                `${import.meta.env.VITE_API_URL}/auth/changePassword`,
                postdata
            )

            if (output.success == 1) {
                const login = await Http.post(
                    `${import.meta.env.VITE_API_URL}/auth/login`,
                    postdata,
                    token
                )

                if (login.success == 1) {
                    changeScreen(PROFILE_SCREEN)
                }
            } else {
                setInputClass(formsStyle.blockInputInvalid)
                setConfirmClass(formsStyle.blockInputInvalid)

                if (output.error) {
                    setError(output.error)
                } else {
                    setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className={authStyle.authStep}>

            <div className={`${mainStyle.subtitle} ${mainStyle.mb10} ${mainStyle.textCenter}`}>
                А теперь задай пароль (минимум 8 символов)
            </div>

            <div className={`${authStyle.passwordField} ${mainStyle.mt15} ${mainStyle.mb10}`}>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Новый пароль"
                    aria-label="Новый пароль"
                    className={`
                        ${formsStyle.blockInput}
                        ${authStyle.eyePadding}
                        ${inputClass || ''}
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

            <div className={`${authStyle.passwordField} ${mainStyle.mb10}`}>
                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Повторите пароль"
                    aria-label="Повторите пароль"
                    className={`
                        ${formsStyle.blockInput}
                        ${authStyle.eyePadding}
                        ${confirmClass || ''}
                    `}
                    onChange={(event) => setConfirmInput(event.target.value)}
                    autoCapitalize="none"
                />

                <button
                    type="button"
                    className={`${mainStyle.plainButton} ${authStyle.eyeSign}`}
                    aria-label={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? (
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
                    onClick={changePassword}
                >
                    Задать пароль
                </button>
            </div>

        </div>
    )
}
