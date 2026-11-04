import questsStyle from '../../styles/questsStyle.module.css'
import mainStyle from '../../styles/mainStyle.module.css'

import { ContactsBlockForm } from './ContactsBlockForm'

import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsBlock = () => {
    return (
        <section className={contactsStyle.blockSection}>
            <div className={contactsStyle.blockCard}>
                <div className={mainStyle.shrinkable}>
                    <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                        ЕСТЬ ВОПРОСЫ?
                    </div>

                    <h2 className={mainStyle.sectionHeading}>
                        Напишите нам
                    </h2>

                    <p className={mainStyle.bodyText}>
                        Свяжитесь с нами с помощью этой формы. Либо пишите в мессенджеры или соцсети.
                    </p>
                </div>

                <ContactsBlockForm />
            </div>
        </section>
    )
}
