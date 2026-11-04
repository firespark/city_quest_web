import questsStyle from '../../styles/questsStyle.module.css'
import mainStyle from '../../styles/mainStyle.module.css'

import { ContactsBlockForm } from './ContactsBlockForm'

import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsBlock = () => {
    return (
        <div className={contactsStyle.blockSection}>
            <div className={contactsStyle.blockCard}>
                <div className={mainStyle.shrinkable}>
                    <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                        ЕСТЬ ВОПРОСЫ?
                    </div>

                    <div className={mainStyle.h2}>Напиши нам</div>

                    <div className={mainStyle.bodyText}>Свяжись с нами с помощью этой формы. Либо пиши в мессенджеры или соцсети.</div>
                </div>

                <ContactsBlockForm />
            </div>
        </div>
    )
}
