
import { useState, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

import { Http } from '../../scripts/http'

type CodeProps = {
    email: string | null
    setTemplate: Dispatch<SetStateAction<string | null>>
    setError: Dispatch<SetStateAction<string | null>>
    setCode: Dispatch<SetStateAction<string | null>>
    setLoader: Dispatch<SetStateAction<boolean>>
    token: string
}

export const Code = ({ email, setTemplate, setError, setCode, setLoader, token }: CodeProps) => {

    const [input, setInput] = useState<string | null>(null)
    const [errorStyle, setErrorStyle] = useState(false)

    const checkCode = async () => {
        setLoader(true)
        setError(null)
        setErrorStyle(false)

        if (!input) {
            setErrorStyle(true)
            setLoader(false)
        } else {
            try {
                const output = await Http.post(
                    `${import.meta.env.VITE_API_URL}/auth/checkCode`,
                    { email, code: input },
                    token
                )

                if (output.success == 1) {
                    setCode(input)
                    setTemplate('newPassword')
                } else {
                    setErrorStyle(true)
                    setError(output.error || 'Неверный код')
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
                Подтверждение
            </div>

            <div className={`${mainStyle.formSubtitle} ${mainStyle.mb25}`}>
                Введите код, отправленный на {email}
            </div>

            <input
                type="text"
                inputMode="numeric"
                placeholder="0000"
                className={`${mainStyle.input} ${errorStyle ? mainStyle.inputError : ''}`}
                onChange={(event) => {
                    setErrorStyle(false)
                    setInput(event.target.value)
                }}
            />

            <button
                type="button"
                className={`${mainStyle.primaryButton} ${mainStyle.mt15}`}
                onClick={checkCode}
            >
                <span className={mainStyle.primaryButtonText}>
                    Дальше
                </span>
            </button>
        </div>
    )
}
