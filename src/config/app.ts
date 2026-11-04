// Адреса карточек приложения задаются в .env. Пустой адрес отключает кнопку.
export const APP_STORES = {
    rustore: import.meta.env.VITE_RUSTORE_URL?.trim() ?? '',
    googlePlay: import.meta.env.VITE_GOOGLE_PLAY_URL?.trim() ?? '',
}
