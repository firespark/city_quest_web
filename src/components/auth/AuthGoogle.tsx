import { useEffect, useRef, useState } from 'react'
import { SOCIAL_AUTH } from '../../config/socialAuth'
import { loadAuthScript, type SocialAuthProps } from '../../scripts/socialAuth'
import authStyle from '../../styles/authStyle.module.css'
import googleIcon from '../../assets/img/google.png'

type GoogleClient = { requestAccessToken: (options: { prompt: string }) => void }

export const AuthGoogle = ({ onCredential, onError }: SocialAuthProps) => {
    const client = useRef<GoogleClient | null>(null)
    const callbacks = useRef({ onCredential, onError })
    const [ready, setReady] = useState(false)
    const [failed, setFailed] = useState(false)
    const [busy, setBusy] = useState(false)
    const [attempt, setAttempt] = useState(0)
    useEffect(() => { callbacks.current = { onCredential, onError } }, [onCredential, onError])

    useEffect(() => {
        if (!SOCIAL_AUTH.google) return
        let active = true
        const initialize = async () => {
            setReady(false)
            setFailed(false)
            await loadAuthScript('https://accounts.google.com/gsi/client?hl=ru')
            if (!active) return
            const sdk = window.google?.accounts.oauth2
            if (!sdk) throw new Error('Не удалось загрузить вход через Google')
            client.current = sdk.initTokenClient({
                client_id: SOCIAL_AUTH.google,
                scope: 'openid email profile',
                callback: response => {
                    if (!active) return
                    setBusy(false)
                    if (response.access_token) callbacks.current.onCredential({ provider: 'google', accessToken: response.access_token })
                    else if (response.error !== 'access_denied') callbacks.current.onError('Не удалось войти через Google. Попробуй снова.')
                },
                error_callback: error => {
                    if (!active) return
                    setBusy(false)
                    if (error.type !== 'popup_closed') callbacks.current.onError('Не удалось войти через Google. Попробуй снова.')
                },
            })
            setReady(true)
        }
        void initialize().catch(() => {
            if (!active) return
            setFailed(true)
            callbacks.current.onError('Не удалось загрузить вход через Google. Проверь подключение и попробуй снова.')
        })
        return () => { active = false; client.current = null }
    }, [attempt])

    const login = () => {
        if (!ready) { setAttempt(value => value + 1); return }
        setBusy(true)
        try { client.current?.requestAccessToken({ prompt: 'select_account' }) }
        catch { setBusy(false); onError('Не удалось войти через Google. Попробуй снова.') }
    }

    return <button type="button" className={authStyle.socialButton} aria-label="Войти через Google" onClick={login} disabled={!SOCIAL_AUTH.google || busy || (!ready && !failed)} title={!SOCIAL_AUTH.google ? 'Вход через Google пока не настроен' : 'Войти через Google'}><img src={googleIcon} alt="Изображение логотипа Google" className={authStyle.googleLogo} aria-hidden="true" /></button>
}
