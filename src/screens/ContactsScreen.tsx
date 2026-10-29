
import mainStyle from '../styles/mainStyle.module.css'
import contactsStyle from '../styles/contactsStyle.module.css'

import { ROUTES } from '../routes'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ContactsContent } from '../components/contacts/ContactsContent'
import { ContactsForm } from '../components/contacts/ContactsForm'

export const ContactsScreen = () => {

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={contactsStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: ROUTES.HOME },
                            { label: 'Контакты' }
                        ]}
                    />

                    <h1 className={contactsStyle.pageTitle}>
                        Контакты
                    </h1>

                    <div className={contactsStyle.contactsLayout}>

                        <ContactsContent />

                        <ContactsForm />

                    </div>

                </div>

            </main>

        </div>
    )
}
