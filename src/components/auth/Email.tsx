
import { useState, type Dispatch, type SetStateAction } from 'react'

import { Agreement } from './Agreement'

import mainStyle from '../../styles/mainStyle.module.css'

import { Http } from '../../scripts/http'

type EmailProps = {
    setEmail: Dispatch<SetStateAction<string | null>>
    setTemplate: Dispatch<SetStateAction<string | null>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoader: Dispatch<SetStateAction<boolean>>
}

export const Email = ({ setEmail, setTemplate, setError, setLoader }: EmailProps) => {

    const [input, setInput] = useState<string | null>(null)
    const [errorStyle, setErrorStyle] = useState(false)
    const [agree, setAgree] = useState(true)

    const checkEmail = async () => {
        setLoader(true)
        setError(null)
        setErrorStyle(false)

        if (!agree) {
            setError('Не отмечена галочка согласия обработки персональных данных')
            setLoader(false)
        } else if (!input) {
            setErrorStyle(true)
            setLoader(false)
        } else {
            try {
                const output = await Http.post<{ email_exists: number }>(
                    `${import.meta.env.VITE_API_URL}/auth/checkEmail`,
                    { email: input }
                )

                if (output.success == 1) {
                    setEmail(input)
                    setTemplate(output.data!.email_exists == 1 ? 'password' : 'createProfile')
                } else {
                    setErrorStyle(true)
                    setError(output.error || 'Ошибка проверки Email')
                }
            } catch (e) {
                console.error('Error:', e)
                setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            } finally {
                setLoader(false)
            }
        }
    }

    return (
        <div className={mainStyle.center}>
            <div className={`${mainStyle.formTitle} ${mainStyle.mb10}`}>
                Добро пожаловать!
            </div>

            <div className={`${mainStyle.formSubtitle} ${mainStyle.mb25}`}>
                Введи Email, чтобы продолжить:
            </div>

            <input
                type="email"
                placeholder="email@example.com"
                className={`${mainStyle.input} ${errorStyle ? mainStyle.inputError : ''}`}
                autoCapitalize="none"
                onChange={(event) => {
                    setErrorStyle(false)
                    setInput(event.target.value)
                }}
            />

            <Agreement agree={agree} setAgree={setAgree} />

            <button
                type="button"
                className={`${mainStyle.primaryButton} ${mainStyle.mt15}`}
                onClick={checkEmail}
            >
                <span className={mainStyle.primaryButtonText}>
                    Дальше
                </span>
            </button>
        </div>
    )
}
