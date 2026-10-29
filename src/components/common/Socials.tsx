
import {
    FaTelegramPlane,
    FaInstagram,
    FaFacebookF,
    FaVk
} from 'react-icons/fa'

import mainStyle from '../../styles/mainStyle.module.css'
import contactsStyle from '../../styles/contactsStyle.module.css'

type SocialsProps = {
    variant?: 'default' | 'footer'
    className?: string
}

const socials = [
    {
        name: 'Telegram',
        url: 'https://t.me/fireleit',
        icon: FaTelegramPlane,
        className: contactsStyle.socialTelegram
    },
    {
        name: 'Instagram',
        url: 'https://instagram.com/elena_fireleit',
        icon: FaInstagram,
        className: contactsStyle.socialInstagram
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/fireleit',
        icon: FaFacebookF,
        className: contactsStyle.socialFacebook
    },
    {
        name: 'ВКонтакте',
        url: 'https://vk.com/fireleit',
        icon: FaVk,
        className: contactsStyle.socialVk
    }
]

export const Socials = ({
    variant = 'default',
    className = ''
}: SocialsProps) => {

    const isFooter = variant === 'footer'

    return (
        <nav
            className={
                isFooter
                    ? className
                    : `${mainStyle.row} ${className}`.trim()
            }
            aria-label="Социальные сети"
        >
            {socials.map(social => {
                const Icon = social.icon

                return (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={
                            isFooter
                                ? undefined
                                : `${contactsStyle.socialIconBtn} ${social.className}`
                        }
                    >
                        <Icon size={isFooter ? 16 : 24} />
                    </a>
                )
            })}
        </nav>
    )
}
