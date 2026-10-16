
import { SocialButtons } from './SocialButtons'

import mainStyle from '../../styles/mainStyle.module.css'
import contactsStyle from '../../styles/contactsStyle.module.css'

export const ContactsContent = () => {

    return (
        <div className={`${mainStyle.card} ${mainStyle.mt20}`}>
            <div className={`${mainStyle.center} ${mainStyle.mb25}`}>

                <SocialButtons />

                <div className={contactsStyle.contactsEmailBlock}>
                    <div className={`${mainStyle.subtitle} ${mainStyle.textCenter} ${mainStyle.mt20}`}>
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

            </div>
        </div>
    )
}
