
import { ContactsBlockForm } from './ContactsBlockForm'

import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsBlock = () => {
    return (
        <section className={contactsStyle.blockSection}>
            <div className={contactsStyle.blockCard}>
                <div className={contactsStyle.blockIntro}>
                    <div className={contactsStyle.blockEyebrow}>
                        ЕСТЬ ВОПРОСЫ?
                    </div>

                    <h2 className={contactsStyle.blockTitle}>
                        Напишите нам
                    </h2>

                    <p className={contactsStyle.blockDescription}>
                        Свяжитесь с нами с помощью этой формы. Либо пишите в мессенджеры или соцсети.
                    </p>
                </div>

                <ContactsBlockForm />
            </div>
        </section>
    )
}
