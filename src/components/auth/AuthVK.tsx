import { useEffect, useRef, useState } from 'react'
import * as VKID from '@vkid/sdk'
import { SOCIAL_AUTH } from '../../config/socialAuth'
import type { SocialAuthProps } from '../../scripts/socialAuth'
import { ROUTES } from '../../routes'
import authStyle from '../../styles/authStyle.module.css'
import vkIcon from '../../assets/img/vk.png'

export const AuthVK = ({ onCredential, onError }: SocialAuthProps) => {
    const [busy, setBusy] = useState(false)
    const mounted = useRef(false)
    useEffect(() => {
        mounted.current = true
        return () => { mounted.current = false }
    }, [])
    const login = async () => {
        setBusy(true)
        try {
            VKID.Config.init({
                app: Number(SOCIAL_AUTH.vk),
                redirectUrl: new URL(ROUTES.AUTH, window.location.origin).href,
                mode: VKID.ConfigAuthMode.InNewWindow,
                responseMode: VKID.ConfigResponseMode.Callback,
                scope: '',
            })
            const response = await VKID.Auth.login()
            if (!mounted.current) return
            if (!response || typeof response !== 'object' || !('code' in response) || !('device_id' in response) || typeof response.code !== 'string' || typeof response.device_id !== 'string') throw new Error('Не получены данные для входа')
            const result = await VKID.Auth.exchangeCode(response.code, response.device_id)
            if (!mounted.current) return
            if (!result.access_token) throw new Error('Не получен токен для входа')
            onCredential({ provider: 'vk', accessToken: result.access_token, clientId: SOCIAL_AUTH.vk })
        } catch (error) {
            // Закрытие окна пользователем не является ошибкой входа.
            if (mounted.current && !(error && typeof error === 'object' && 'code' in error && error.code === VKID.AuthErrorCode.NewTabHasBeenClosed)) {
                onError('Не удалось войти через VK. Попробуй снова.')
            }
        } finally {
            if (mounted.current) setBusy(false)
        }
    }

    return <button type="button" className={authStyle.socialButton} aria-label="Войти через VK" onClick={() => void login()} disabled={!SOCIAL_AUTH.vk || busy} title={!SOCIAL_AUTH.vk ? 'Вход через VK пока не настроен' : 'Войти через VK'}><img src={vkIcon} alt="Изображение логотипа VK" className={authStyle.vkLogo} aria-hidden="true" /></button>
}
