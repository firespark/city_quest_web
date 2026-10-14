
import { useEffect, useState } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

export const ConnectionError = ({ onRetry }: { onRetry: () => void | Promise<void> }) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null


    return (
        <div className={`${mainStyle.center} ${mainStyle.mt30} ${mainStyle.p20}`}>
            <div className={`${mainStyle.titleMain} ${mainStyle.mb10}`}>
                Нет подключения
            </div>

            <div className={`${mainStyle.description} ${mainStyle.textCenter} ${mainStyle.mb20}`}>
                Не удалось загрузить данные. Проверьте подключение к интернету и попробуйте снова.
            </div>

            <button
                type="button"
                className={mainStyle.primaryButton}
                onClick={onRetry}
            >
                <span className={mainStyle.primaryButtonText}>Повторить</span>
            </button>
        </div>
    )
}
