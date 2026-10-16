
import { FaTelegramPlane, FaInstagram, FaFacebookF, FaVk } from 'react-icons/fa'

import mainStyle from '../../styles/mainStyle.module.css'
import contactsStyle from '../../styles/contactsStyle.module.css'

export const SocialButtons = () => {

    return (
        <div className={mainStyle.center}>
            <div className={`${mainStyle.subtitle} ${mainStyle.textCenter} ${mainStyle.mb15}`}>
                Напиши нам в соцсетях:
            </div>

            <div className={mainStyle.row}>

                <a
                    href="https://t.me/fireleit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactsStyle.socialIconBtn}
                    style={{ backgroundColor: '#2AABEE' }}
                    aria-label="Telegram"
                >
                    <FaTelegramPlane size={24} color="#FFFFFF" />
                </a>

                <a
                    href="https://instagram.com/elena_fireleit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactsStyle.socialIconBtn}
                    style={{ backgroundColor: '#E1306C' }}
                    aria-label="Instagram"
                >
                    <FaInstagram size={24} color="#FFFFFF" />
                </a>

                <a
                    href="https://www.facebook.com/fireleit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactsStyle.socialIconBtn}
                    style={{ backgroundColor: '#1877F2' }}
                    aria-label="Facebook"
                >
                    <FaFacebookF size={22} color="#FFFFFF" />
                </a>

                <a
                    href="https://vk.com/fireleit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactsStyle.socialIconBtn}
                    style={{ backgroundColor: '#0077FF' }}
                    aria-label="ВКонтакте"
                >
                    <FaVk size={22} color="#FFFFFF" />
                </a>

            </div>
        </div>
    )
}
