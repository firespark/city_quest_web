
import { useState, type Dispatch, type SetStateAction } from 'react'

import { Agreement } from './Agreement'

import mainStyle from '../../styles/mainStyle.module.css'
import authStyle from '../../styles/authStyle.module.css'
import formsStyle from '../../styles/formsStyle.module.css'

import { Http } from '../../scripts/http'

type EmailResetProps = {
    setEmail: Dispatch<SetStateAction<string | null>>
    setTemplate: Dispatch<SetStateAction<string | null>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoader: Dispatch<SetStateAction<boolean>>
}

export const EmailReset = ({
    setEmail,
    setTemplate,
    setError,
    setLoader
}: EmailResetProps) => {

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
                const output = await Http.post(
                    `${import.meta.env.VITE_API_URL}/auth/sendPasswordReset`,
                    { email: input }
                )

                if (output.success == 1) {
                    setEmail(input)
                    setTemplate('code')
                } else {
                    setErrorStyle(true)
                    setError(output.error || 'Ошибка восстановления')
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
        <div className={authStyle.authStep}>

            <div className={`${mainStyle.formTitle} ${mainStyle.mb10} ${mainStyle.textCenter}`}>
                Восстановление доступа
            </div>

            <div className={`${mainStyle.formSubtitle} ${mainStyle.mb25}`}>
                Введите ваш Email для восстановления пароля:
            </div>

            <input
                type="email"
                placeholder="email@example.com"
                aria-label="Email"
                className={`
                    ${formsStyle.blockInput}
                    ${errorStyle ? formsStyle.blockInputInvalid : ''}
                `}
                autoCapitalize="none"
                onChange={(event) => {
                    setErrorStyle(false)
                    setInput(event.target.value)
                }}
            />

            <div className={formsStyle.blockButtonRow}>
                <button
                    type="button"
                    className={mainStyle.siteButton}
                    onClick={checkEmail}
                >
                    Дальше
                </button>
            </div>

            <Agreement agree={agree} setAgree={setAgree} />

        </div>
    )
}
