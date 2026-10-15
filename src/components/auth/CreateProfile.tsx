
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

import { Http } from '../../scripts/http'

type CreateProfileProps = {
    email: string | null
    setTemplate: Dispatch<SetStateAction<string | null>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoader: Dispatch<SetStateAction<boolean>>
}

export const CreateProfile = ({ email, setTemplate, setError, setLoader }: CreateProfileProps) => {

    const sendCode = async () => {
        setError(null)
        setLoader(true)

        try {
            const output = await Http.post(
                `${import.meta.env.VITE_API_URL}/auth/sendCode`,
                { email }
            )

            if (output.success == 1) {
                setTemplate('code')
            } else {
                setError(output.error || 'Ошибка отправки кода')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className={mainStyle.center}>
            <div className={`${mainStyle.formTitle} ${mainStyle.mb10}`}>
                Новый аккаунт?
            </div>

            <div className={`${mainStyle.formSubtitle} ${mainStyle.mb25}`}>
                Email <span className={mainStyle.formThirdtitle}>{email}</span> еще не зарегистрирован. Создать учетную запись?
            </div>

            <button
                type="button"
                className={`${mainStyle.primaryButton} ${mainStyle.mt15}`}
                onClick={sendCode}
            >
                <span className={mainStyle.primaryButtonText}>
                    Создать
                </span>
            </button>

            <button
                type="button"
                className={`${mainStyle.secondButton} ${mainStyle.mt15}`}
                onClick={() => setTemplate(null)}
            >
                <span className={mainStyle.secondButtonText}>
                    Ввести другой емейл
                </span>
            </button>
        </div>
    )
}
