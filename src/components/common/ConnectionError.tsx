
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type ReactNode } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'

type Retry = () => void | Promise<void>
type RegisterError = (id: string, onRetry: Retry) => () => void

const ConnectionErrorContext = createContext<{
    registerError: RegisterError
    errors: Map<string, Retry>
} | null>(null)

type ConnectionErrorProps = {
    onRetry: Retry
}

export const ConnectionErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errors, setErrors] = useState<Map<string, Retry>>(() => new Map())

    const registerError = useCallback<RegisterError>((id, onRetry) => {
        setErrors(current => new Map(current).set(id, onRetry))

        return () => {
            setErrors(current => {
                const next = new Map(current)
                next.delete(id)
                return next
            })
        }
    }, [])

    return (
        <ConnectionErrorContext.Provider value={{ registerError, errors }}>
            {children}
        </ConnectionErrorContext.Provider>
    )
}

export const ConnectionErrorContent = ({ children }: { children: ReactNode }) => {
    const context = useContext(ConnectionErrorContext)
    const errors = context?.errors
    const hasErrors = Boolean(errors?.size)

    const retryAll = async () => {
        await Promise.all([...(errors?.values() ?? [])].map(onRetry => onRetry()))
    }

    return (
        <>
            {hasErrors && <ConnectionErrorCard onRetry={retryAll} />}
            <div hidden={hasErrors}>
                {children}
            </div>
        </>
    )
}

export const ConnectionError = ({ onRetry }: ConnectionErrorProps) => {
    const registerError = useContext(ConnectionErrorContext)?.registerError
    const id = useId()
    const retryRef = useRef(onRetry)

    useEffect(() => {
        retryRef.current = onRetry
    }, [onRetry])

    useEffect(() => {
        return registerError?.(id, () => retryRef.current())
    }, [id, registerError])

    return registerError ? null : <ConnectionErrorCard onRetry={onRetry} />
}

const ConnectionErrorCard = ({ onRetry }: ConnectionErrorProps) => {

    return (
        <div className={mainStyle.connectionError} role="status">
            <h2 className={mainStyle.connectionErrorTitle}>
                Нет подключения
            </h2>

            <p className={mainStyle.bodyText}>
                Не удалось загрузить данные. Проверьте подключение к интернету и попробуйте снова.
            </p>

            <button
                type="button"
                className={mainStyle.siteButton}
                onClick={onRetry}
            >
                Повторить
            </button>
        </div>
    )
}
