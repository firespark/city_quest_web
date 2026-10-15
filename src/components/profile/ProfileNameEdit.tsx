
import { useState, useContext, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

type ProfileUserData = {
    name: string | null
    email: string | null
    notes: number
    [key: string]: unknown
}

type ProfileNameEditProps = {
    user: ProfileUserData
    setUser: Dispatch<SetStateAction<ProfileUserData>>
    setTemplate: Dispatch<SetStateAction<string | null>>
    setSuccess: Dispatch<SetStateAction<string | null>>
}

export const ProfileNameEdit = ({ user, setUser, setTemplate, setSuccess }: ProfileNameEditProps) => {

    const { token } = useContext(MainContext)

    const [input, setInput] = useState<string | null>(user.name)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const saveName = async () => {
        const postdata = { name: input }

        setError(null)
        setLoader(true)

        try {
            const output = await Http.post(
                `${import.meta.env.VITE_API_URL}/users/saveName`,
                postdata,
                token
            )

            if (output.success == 1) {
                setUser({
                    ...user,
                    name: input
                })

                setSuccess('Изменения сохранены')
                setTemplate(null)
            } else {
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

    if (loader) return <Loader />

    return (
        <div className={profileStyle.editContainer}>
            <div className={`${profileStyle.label} ${mainStyle.mb10}`}>
                Ваше имя
            </div>

            <input
                type="text"
                placeholder="Введите имя"
                className={profileStyle.inputModern}
                value={input ?? ''}
                onChange={(event) => setInput(event.target.value)}
            />

            {error && (
                <div className={`${mainStyle.mt10} ${mainStyle.mb10}`}>
                    <Error text={error} />
                </div>
            )}

            <button
                type="button"
                className={`${mainStyle.button} ${mainStyle.mt10}`}
                onClick={saveName}
            >
                <span className={mainStyle.buttonText}>
                    Сохранить
                </span>
            </button>
        </div>
    )
}
