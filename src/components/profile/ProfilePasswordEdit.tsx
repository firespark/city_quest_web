
import { useState, useContext, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'
import formsStyle from '../../styles/formsStyle.module.css'

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
            setStyle(formsStyle.blockInputInvalid)
            setError('Пароль должен содержать минимум 8 символов')
            return
        }

        if (!confirmInput) {
            setConfirmStyle(formsStyle.blockInputInvalid)
            setError('Пожалуйста, повторите пароль')
            return
        }

        if (input !== confirmInput) {
            setStyle(formsStyle.blockInputInvalid)
            setConfirmStyle(formsStyle.blockInputInvalid)
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
                setStyle(formsStyle.blockInputInvalid)
                setConfirmStyle(formsStyle.blockInputInvalid)

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
        <form
            className={formsStyle.blockForm}
            onSubmit={(event) => {
                event.preventDefault()
                void savePassword()
            }}
        >

            <div className={profileStyle.formField}>

                <label
                    htmlFor="profile-password"
                    className={profileStyle.label}
                >
                    Новый пароль
                </label>

                <input
                    id="profile-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Минимум 8 символов"
                    className={`${formsStyle.blockInput} ${style || ''}`}
                    value={input ?? ''}
                    onChange={(event) => setInput(event.target.value)}
                    autoCapitalize="none"
                />

            </div>

            <div className={profileStyle.formField}>

                <label
                    htmlFor="profile-password-confirm"
                    className={profileStyle.label}
                >
                    Повторите пароль
                </label>

                <input
                    id="profile-password-confirm"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Повторите пароль"
                    className={`${formsStyle.blockInput} ${confirmStyle || ''}`}
                    value={confirmInput ?? ''}
                    onChange={(event) => setConfirmInput(event.target.value)}
                    autoCapitalize="none"
                />

            </div>

            {error && (
                <div className={mainStyle.mb15}>
                    <Error text={error} />
                </div>
            )}

            <div className={formsStyle.blockButtonRow}>

                <button
                    type="submit"
                    className={mainStyle.siteButton}
                >
                    Сохранить
                </button>

            </div>

        </form>
    )
}
