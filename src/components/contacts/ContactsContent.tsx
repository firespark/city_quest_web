
import { Socials } from '../common/Socials'

import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsContent = () => {

    return (
        <aside className={contactsStyle.contactsInfo}>

            <div className={contactsStyle.contactsEmailTitle}>
                Напиши нам в соцсети:
            </div>

            <Socials className={contactsStyle.contactsSocials} />

            <div className={contactsStyle.contactsEmailBlock}>

                <div className={contactsStyle.contactsEmailTitle}>
                    Или на Email:
                </div>

                <a
                    href="mailto:info@gagara-web.ru"
                    className={contactsStyle.emailButton}
                >
                    <span className={contactsStyle.emailText}>
                        info@gagara-web.ru
                    </span>
                </a>

            </div>

        </aside>
    )
}
