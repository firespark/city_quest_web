// Ответ принимает только открывшая окно страница того же сайта; state проверяется там.
const params = new URLSearchParams(window.location.hash.slice(1))
const state = params.get('state')
if (window.opener && state) {
    window.opener.postMessage({
        type: 'city-quest-yandex-auth',
        state,
        accessToken: params.get('access_token'),
        error: params.get('error'),
    }, window.location.origin)
}
// Токен не остаётся в адресной строке или истории вспомогательной страницы.
window.history.replaceState(null, '', window.location.pathname)
