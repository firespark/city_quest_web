export type SocialCredential =
    | { provider: 'google'; accessToken: string }
    | { provider: 'vk' | 'yandex'; accessToken: string; clientId: string }

export type SocialAuthProps = {
    onCredential: (credential: SocialCredential) => void
    onError: (message: string) => void
}

declare global {
    interface Window {
        google?: {
            accounts: {
                oauth2: {
                    initTokenClient: (options: {
                        client_id: string
                        scope: string
                        callback: (response: { access_token?: string; error?: string }) => void
                        error_callback: (error: { type?: string }) => void
                    }) => { requestAccessToken: (options: { prompt: string }) => void }
                }
            }
        }
    }
}

const scripts = new Map<string, Promise<void>>()

export const loadAuthScript = (src: string): Promise<void> => {
    const existing = scripts.get(src)
    if (existing) return existing

    const promise = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        const fail = () => {
            clearTimeout(timeout)
            script.remove()
            scripts.delete(src)
            reject(new Error('Не удалось загрузить сервис входа. Проверь подключение и попробуй снова.'))
        }
        const timeout = window.setTimeout(fail, 15000)
        script.src = src
        script.async = true
        script.onload = () => { clearTimeout(timeout); resolve() }
        script.onerror = fail
        document.head.append(script)
    })
    scripts.set(src, promise)
    return promise
}
