
import { useState, useContext, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

type ProfilePasswordEditProps = {
    setTemplate: Dispatch<SetStateAction<string | null>>
    setSuccess: Dispatch<SetStateAction<string | null>>
}

export const ProfilePasswordEdit = ({ setTemplate, setSuccess }: ProfilePasswordEditProps) => {

    const { token } = useContext(MainContext)

    const [input, setInput] = useState<string | null>(null)
    const [confirmInput, setConfirmInput] = useState<string | null>(null)

    const [style, setStyle] = useState<string | null>(null)
    const [confirmStyle, setConfirmStyle] = useState<string | null>(null)

    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const savePassword = async () => {
        setError(null)
        setStyle(null)
        setConfirmStyle(null)

        if (!input || input.length < 8) {
            setStyle(profileStyle.inputError)
            setError('Пароль должен содержать минимум 8 символов')
            return
        }

        if (!confirmInput) {
            setConfirmStyle(profileStyle.inputError)
            setError('Пожалуйста, повторите пароль')
            return
        }

        if (input !== confirmInput) {
            setStyle(profileStyle.inputError)
            setConfirmStyle(profileStyle.inputError)
            setError('Пароли не совпадают')
            return
        }

        setLoader(true)

        const postdata = { password: input }

        try {
            const output = await Http.post(
                `${import.meta.env.VITE_API_URL}/users/savePassword`,
                postdata,
                token
            )

            if (output.success == 1) {
                setSuccess('Изменения сохранены')
                setTemplate(null)
            } else {
                setStyle(profileStyle.inputError)
                setConfirmStyle(profileStyle.inputError)

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

    if (loader) {
        return <Loader />
    }

    return (
        <div className={profileStyle.editContainer}>
            <div className={`${profileStyle.label} ${mainStyle.mb10}`}>
                Новый пароль
            </div>

            <input
                type="password"
                placeholder="Минимум 8 символов"
                className={`${profileStyle.inputModern} ${style || ''}`}
                onChange={(event) => setInput(event.target.value)}
                autoCapitalize="none"
            />

            <div className={`${profileStyle.label} ${mainStyle.mb10} ${mainStyle.mt5}`}>
                Повторите пароль
            </div>

            <input
                type="password"
                placeholder="Повторите пароль"
                className={`${profileStyle.inputModern} ${confirmStyle || ''}`}
                onChange={(event) => setConfirmInput(event.target.value)}
                autoCapitalize="none"
            />

            {error && (
                <div className={mainStyle.mb15}>
                    <Error text={error} />
                </div>
            )}

            <button
                type="button"
                className={`${mainStyle.button} ${mainStyle.mt10}`}
                onClick={savePassword}
            >
                <span className={mainStyle.buttonText}>
                    Сохранить
                </span>
            </button>
        </div>
    )
}
