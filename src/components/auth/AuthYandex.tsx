import { useEffect, useRef, useState } from 'react'
import { SOCIAL_AUTH } from '../../config/socialAuth'
import type { SocialAuthProps } from '../../scripts/socialAuth'
import authStyle from '../../styles/authStyle.module.css'
import yandexIcon from '../../assets/img/yandex.png'

export const AuthYandex = ({ onCredential, onError }: SocialAuthProps) => {
    const [busy, setBusy] = useState(false)
    const mounted = useRef(false)
    const cancel = useRef<(() => void) | null>(null)
    useEffect(() => {
        mounted.current = true
        return () => { mounted.current = false; cancel.current?.() }
    }, [])

    const login = async () => {
        setBusy(true)
        const state = Array.from(crypto.getRandomValues(new Uint8Array(32)), value => value.toString(16).padStart(2, '0')).join('')
        const origin = window.location.origin
        const url = new URL('https://oauth.yandex.ru/authorize')
        url.search = new URLSearchParams({ response_type: 'token', client_id: SOCIAL_AUTH.yandex, redirect_uri: new URL('/yandex-auth.html', origin).href, state }).toString()
        try {
            const accessToken = await new Promise<string>((resolve, reject) => {
                let popup: Window | null = null
                let interval: number | undefined
                let timeout: number | undefined
                const cleanup = () => {
                    window.removeEventListener('message', receive)
                    clearInterval(interval)
                    clearTimeout(timeout)
                    popup?.close()
                    cancel.current = null
                }
                const stop = () => { cleanup(); reject(new Error('cancelled')) }
                const receive = (event: MessageEvent) => {
                    const data = event.data
                    if (event.origin !== origin || event.source !== popup || !data || data.type !== 'city-quest-yandex-auth' || data.state !== state) return
                    cleanup()
                    if (typeof data.accessToken === 'string' && data.accessToken) resolve(data.accessToken)
                    else reject(new Error(data.error === 'access_denied' ? 'cancelled' : 'failed'))
                }
                window.addEventListener('message', receive)
                popup = window.open(url.href, 'city-quest-yandex', 'popup,width=520,height=700')
                if (!popup) { cleanup(); reject(new Error('blocked')); return }
                cancel.current = stop
                interval = window.setInterval(() => { if (popup?.closed) stop() }, 500)
                timeout = window.setTimeout(stop, 300000)
            })
            if (mounted.current) onCredential({ provider: 'yandex', accessToken, clientId: SOCIAL_AUTH.yandex })
        } catch (error) {
            if (mounted.current && (!(error instanceof Error) || error.message !== 'cancelled')) onError('Не удалось войти через Яндекс. Попробуй снова.')
        } finally {
            if (mounted.current) setBusy(false)
        }
    }

    return <button type="button" className={authStyle.socialButton} aria-label="Войти через Яндекс" onClick={() => void login()} disabled={!SOCIAL_AUTH.yandex || busy} title={!SOCIAL_AUTH.yandex ? 'Вход через Яндекс пока не настроен' : 'Войти через Яндекс'}><img src={yandexIcon} alt="Изображение логотипа Яндекса" aria-hidden="true" /></button>
}
