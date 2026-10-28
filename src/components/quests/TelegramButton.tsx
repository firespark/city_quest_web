
import type { ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

type TelegramButtonProps = {
    children: ReactNode
    className?: string
}

export const TelegramButton = ({
    children,
    className = ''
}: TelegramButtonProps) => {

    const url = import.meta.env.VITE_TELEGRAM_BOT_URL?.trim()

    if (!url) return null

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${mainStyle.siteButton} ${className}`}
        >
            {children}
        </a>
    )
}
