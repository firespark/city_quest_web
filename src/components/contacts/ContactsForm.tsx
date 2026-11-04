
import { ContactsBlockForm } from './ContactsBlockForm'

import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsForm = () => {
    return (
        <div className={contactsStyle.contactsCard}>

            <div className={contactsStyle.contactsEmailTitle}>Отправь сообщение с сайта:</div>

            <ContactsBlockForm />

        </div>
    )
}
