
import { useState, useContext, type Dispatch, type SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import profileStyle from '../../styles/profileStyle.module.css'
import formsStyle from '../../styles/formsStyle.module.css'

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
        <form
            className={formsStyle.blockForm}
            onSubmit={(event) => {
                event.preventDefault()
                void saveName()
            }}
        >

            <div className={profileStyle.formField}>

                <label
                    htmlFor="profile-name"
                    className={profileStyle.label}
                >
                    Ваше имя
                </label>

                <input
                    id="profile-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Введите имя"
                    className={formsStyle.blockInput}
                    value={input ?? ''}
                    onChange={(event) => setInput(event.target.value)}
                />

            </div>

            {error && (
                <div className={`${mainStyle.mt10} ${mainStyle.mb10}`}>
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
