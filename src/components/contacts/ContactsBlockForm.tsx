
import { useState, type FormEvent } from 'react'

import { Http } from '../../scripts/http'

import { Loader } from '../common/Loader'

import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsBlockForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [agree, setAgree] = useState(false)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sent, setSent] = useState(false)

    const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        if (!agree) {
            setError('Необходимо согласие на обработку персональных данных')
            return
        }

        if (!name.trim() || !email.trim() || !message.trim()) {
            setError('Заполните все поля формы')
            return
        }

        setLoader(true)

        try {
            const output = await Http.post(
                `${import.meta.env.VITE_API_URL}/contacts/send`,
                {
                    name: name.trim(),
                    email: email.trim(),
                    message: message.trim()
                }
            )

            if (output.success == 1) {
                setSent(true)
            } else {
                setError('Не удалось отправить сообщение. Попробуйте ещё раз.')
            }
        } catch (e) {
            console.error('Error:', e)
            setError('Не удалось отправить сообщение. Попробуйте ещё раз.')
        } finally {
            setLoader(false)
        }
    }

    if (loader) return <Loader />

    if (sent) {
        return (
            <div className={contactsStyle.blockSuccess} role="status">
                Сообщение отправлено. Спасибо!
            </div>
        )
    }

    return (
        <form
            className={contactsStyle.blockForm}
            onSubmit={sendEmail}
        >
            <div className={contactsStyle.blockFields}>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    aria-label="Ваше имя"
                    className={contactsStyle.blockInput}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    required
                />


                <input
                    type="text"
                    placeholder="Email или мессенджер"
                    aria-label="Email или мессенджер"
                    className={contactsStyle.blockInput}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                />


                <textarea
                    placeholder="Ваше сообщение"
                    aria-label="Ваше сообщение"
                    className={contactsStyle.blockTextarea}
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    rows={4}
                    required
                />
            </div>

            <label className={contactsStyle.blockAgreement}>
                <input
                    type="checkbox"
                    className={contactsStyle.blockCheckbox}
                    checked={agree}
                    onChange={event => setAgree(event.target.checked)}
                />
                <span>
                    Соглашаюсь на обработку моих персональных данных
                </span>
            </label>

            {error && (
                <div
                    className={contactsStyle.blockError}
                    role="alert"
                >
                    {error}
                </div>
            )}

            <div className={contactsStyle.blockButtonRow}>
                <button
                    type="submit"
                    className={contactsStyle.blockButton}
                    disabled={loader}
                >
                    Отправить сообщение
                </button>
            </div>
        </form>
    )
}
