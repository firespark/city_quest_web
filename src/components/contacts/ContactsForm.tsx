
import { ContactsBlockForm } from './ContactsBlockForm'

import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsForm = () => {
    return (
        <section className={contactsStyle.contactsCard}>

            <div className={contactsStyle.contactsEmailTitle}>
                Отправь сообщение с сайта:
            </div>

            <ContactsBlockForm />

        </section>
    )
}
