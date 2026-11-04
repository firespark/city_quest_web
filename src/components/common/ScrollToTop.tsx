import { useEffect, useState } from 'react'
import { IoArrowUp } from 'react-icons/io5'

import mainStyle from '../../styles/mainStyle.module.css'

export const ScrollToTop = () => {
    const [visible, setVisible] = useState(() => window.scrollY > 400)

    useEffect(() => {
        const updateVisibility = () => setVisible(window.scrollY > 400)

        window.addEventListener('scroll', updateVisibility, { passive: true })
        return () => window.removeEventListener('scroll', updateVisibility)
    }, [])

    if (!visible) return null

    return (
        <button
            type="button"
            aria-label="Наверх"
            className={`${mainStyle.siteButton} ${mainStyle.scrollToTop}`}
            onClick={() => window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth'
            })}
        >
            <IoArrowUp size={20} aria-hidden="true" />
        </button>
    )
}
