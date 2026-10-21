
import mainStyle from '../styles/mainStyle.module.css'

import { ContactsContent } from '../components/contacts/ContactsContent'
import { ContactsForm } from '../components/contacts/ContactsForm'

export const ContactsScreen = () => {

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            
            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.scrollContent}>
                    <ContactsContent />
                    <ContactsForm />
                </div>
            </main>

        </div>
    )
}
