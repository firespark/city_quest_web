export const SOCIAL_AUTH = {
    google: import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() ?? '',
    vk: import.meta.env.VITE_VK_CLIENT_ID?.trim() ?? '',
    yandex: import.meta.env.VITE_YANDEX_CLIENT_ID?.trim() ?? '',
}
