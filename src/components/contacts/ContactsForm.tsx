
import { useState } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import contactsStyle from '../../styles/contactsStyle.module.css'

import { Agreement } from '../auth/Agreement'
import { Loader } from '../common/Loader'
import { Error } from '../common/Error'
import { Http } from '../../scripts/http'

type FormStyle = {
    name: string | null
    email: string | null
    message: string | null
}

type ContactResponse = {
    message: string
}

export const ContactsForm = () => {

    const [loader, setLoader] = useState(false)

    const [name, setName] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const [agree, setAgree] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [sent, setSent] = useState<string | null>(null)

    const [style, setStyle] = useState<FormStyle>({
        name: null,
        email: null,
        message: null
    })

    const sendEmail = async () => {
        setLoader(true)
        setError(null)
        setStyle({ name: null, email: null, message: null })

        if (!agree) {
            setError('Не отмечена галочка согласия обработки персональных данных')
            setLoader(false)
        }
        else if (!name) {
            setStyle({ ...style, name: mainStyle.inputError })
            setLoader(false)
        }
        else if (!email) {
            setStyle({ ...style, email: mainStyle.inputError })
            setLoader(false)
        }
        else if (!message) {
            setStyle({ ...style, message: mainStyle.inputError })
            setLoader(false)
        }
        else {
            const postdata = { name, email, message }

            try {
                const output = await Http.post<ContactResponse>(
                    `${import.meta.env.VITE_API_URL}/contacts/send`,
                    postdata
                )

                if (output.success == 1) {
                    setSent(output.data!.message)
                }
                else {
                    setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
            catch (e) {
                console.error('Error:', e)
                setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
            finally {
                setLoader(false)
            }
        }
    }

    if (loader) return <Loader />

    return (
        <div className={contactsStyle.contactsCard}>

            {error && (
                <div className={mainStyle.mb15}>
                    <Error text={error} />
                </div>
            )}

            {sent ? (
                <div className={mainStyle.successBlock}>
                    <div className={mainStyle.successText}>
                        {sent}
                    </div>
                </div>
            ) : (
                <div className={contactsStyle.contactsFormWrapper}>

                    <div className={`${mainStyle.titleMain} ${mainStyle.textCenter}`}>
                        Написать разработчикам
                    </div>

                    <input
                        type="text"
                        placeholder="Имя"
                        className={`${mainStyle.modernInput} ${style.name || ''}`}
                        onChange={(event) => {
                            setStyle({ ...style, name: null })
                            setName(event.target.value)
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Email или телефон для связи"
                        className={`${mainStyle.modernInput} ${style.email || ''}`}
                        onChange={(event) => {
                            setStyle({ ...style, email: null })
                            setEmail(event.target.value)
                        }}
                    />

                    <textarea
                        placeholder="Сообщение"
                        className={`${mainStyle.modernTextarea} ${style.message || ''}`}
                        rows={4}
                        onChange={(event) => {
                            setStyle({ ...style, message: null })
                            setMessage(event.target.value)
                        }}
                    />

                    <Agreement agree={agree} setAgree={setAgree} />

                    <div className={`${mainStyle.center} ${mainStyle.mt20}`}>
                        <button
                            type="button"
                            className={mainStyle.primaryButton}
                            onClick={sendEmail}
                        >
                            <span className={mainStyle.primaryButtonText}>
                                Отправить
                            </span>
                        </button>
                    </div>

                </div>
            )}
        </div>
    )
}
