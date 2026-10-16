
import mainStyle from '../styles/mainStyle.module.css'
import headerStyle from '../styles/headerStyle.module.css'

import { Back } from '../components/common/Back'
import { HeaderTitle } from '../components/common/HeaderTitle'
import { Menu } from '../components/common/Menu'

import { ContactsContent } from '../components/contacts/ContactsContent'
import { ContactsForm } from '../components/contacts/ContactsForm'

import { Footer } from '../components/common/Footer'

export const ContactsScreen = () => {

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <header className={headerStyle.panelHeader}>
                <Back />
                <HeaderTitle title="Контакты" />
                <Menu />
            </header>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.scrollContent}>
                    <ContactsContent />
                    <ContactsForm />
                </div>
            </main>

            <Footer />
        </div>
    )
}
