# Карта сайта

`/sitemap.xml` формирует Laravel при каждом запросе: новые города и квесты появляются после публикации в админке без пересборки React. Включаются также доступные анонсы «Скоро». Профиль, авторизация, настройки, восстановление пароля, черновики и страницы 404 исключены.

- Домен задаётся в `.env`: `VITE_SITE_URL=https://gagara-fun.ru`. После изменения адреса пересоберите фронтенд, чтобы обновились метатеги и `seo-pages.json` для sitemap.
- `npm run build` создаёт `dist/seo-pages.json` из публичных маршрутов и истории изменения их исходников. Этот файл нужно разместить в `public` Laravel вместе с обновлением фронтенда.
- На сервере `/sitemap.xml` и `/robots.txt` должны обрабатываться Laravel, а не перенаправляться на React `index.html`. При раздельном хостинге настройте проксирование этих двух адресов.
- В `.env` Laravel можно задать `SITE_URL` и `SITE_MANIFEST_PATH`, если домен или расположение манифеста отличаются.
- Для локальной разработки `SITEMAP_BACKEND_URL=http://quest` включает прокси Vite. `SITEMAP_MANIFEST_PATH` позволяет сборке сразу скопировать манифест в локальный `public` Laravel; примеры — в `.env.example`.

Адреса `/index.php`, `/index.html`, `/index.htm` (включая варианты со слешем и другим регистром) перенаправляются кодом 301 на главную. Параметры запроса сохраняются. На Apache используется обновлённый `public/.htaccess` Laravel, на Vite dev/preview — плагин редиректа. При отдельном Nginx/static-хостинге аналогичное правило нужно задать до выдачи `index.html`.

`lastmod` берётся из дат изменения записей и исходников, а не из времени запроса sitemap. В существующей таблице `pages` нет `updated_at`, поэтому для «О проекте» и «Как играть» дата не выдумывается и пока не указывается. Если у этих записей появится `updated_at`, карта начнёт использовать его автоматически.

## HTML и HTTP-кеширование

Для совместного размещения скопируйте содержимое `dist` в `public` Laravel после `npm run build`, сохранив Laravel `index.php`, `.htaccess` и существующие папки. Корень сайта в настройках хостинга должен указывать на `public` Laravel. На Apache используйте обновлённый `.htaccess`; на Nginx HTML-маршруты, включая `/`, нужно передавать Laravel, а существующие ресурсы `/assets/`, `/img/` и другие файлы выдавать напрямую. `index.html` не должен быть DirectoryIndex или SPA fallback на уровне хостинга: иначе PHP не сможет добавить заголовки.

Laravel отдаёт React HTML с `Last-Modified` и `ETag`, учитывая сборку и даты содержимого. Повторные GET/HEAD с `If-Modified-Since` или `If-None-Match` получают пустой ответ `304`, если версия не изменилась. `If-None-Match` имеет приоритет. Для «О проекте» и «Как играть» без даты содержимого используется только `ETag`; профиль, авторизация, настройки, восстановление пароля, предпросмотр черновиков и ошибки не кешируются. При изменениях в админке пересборка React для обновления заголовков не нужна.

При другом расположении HTML задайте `FRONTEND_INDEX_PATH` в `.env` Laravel; JS/CSS сборки должны оставаться доступны по адресам из этого HTML. В Vite dev/preview HTML обслуживает Vite — эти серверные заголовки проверяются через Laravel. Рабочий хостинг начнёт использовать их после выкладки PHP-кода, сборки и настройки сервера.

## Open Graph

Open Graph настраивается в `src/config/pages.ts`: `OPEN_GRAPH` содержит общие настройки, а `PAGES.*.meta.openGraph` — переопределения страницы. `title` и `description` используются также для карточки ссылки, если внутри `openGraph` они не заданы отдельно. Изображение задаётся объектом `image` с `url`, `alt` и, если известны, фактическими `width`, `height`, `type`. Относительные адреса разрешаются от домена `VITE_SITE_URL` из `.env`.

Сборка записывает настройки в `seo-pages.json` и добавляет метатеги главной в `index.html`. Laravel подставляет метатеги запрошенной страницы в исходный HTML, поэтому карточки доступны без JavaScript. Для городов и квестов название, описание и изображение берутся из опубликованных данных. При навигации внутри React обновляются все метатеги, включая Open Graph и Twitter Card. Для изменения настроек конфигурации нужно пересобрать и выложить одновременно `index.html`, ресурсы и `seo-pages.json` вместе с PHP-изменениями.

## Приложение и покупка квестов

Прохождение квестов доступно только в мобильном приложении. Бесплатные и уже купленные квесты показывают кнопки магазинов; платные без доступа ведут на `/purchase?quest=<slug>`. Покупка в рублях выполняется в приложении из RuStore. Для лари и долларов страница предлагает вход и обращение во все соцсети из «Контактов» с email аккаунта и названием квеста. После входа или регистрации пользователь возвращается к выбранному квесту. Оплата и автоматическая отправка сообщений на сайте не выполняются.

В `.env` задайте `VITE_RUSTORE_URL` и `VITE_GOOGLE_PLAY_URL` — полные адреса карточек приложения. Пустое значение отключает соответствующую кнопку. После изменения `.env` перезапустите Vite, а для рабочего сайта пересоберите и выложите React. Значения `VITE_*` публичны. Готовые PNG значков магазинов находятся в `src/assets/img`: RuStore — из [официального медиакита](https://www.rustore.ru/media-kit) (RuStore_Icon.png), Google Play — [официальный значок Google](https://www.gstatic.com/images/branding/product/2x/play_prism_64dp.png). Оба используются без обрезки с одним размером в CSS.

При совместном размещении с Laravel также выложите изменение `config/sitemap.php`: страница покупки исключена из индексации и обслуживается без кеширования.

## Вход через Google, VK ID и Яндекс

В `.env` React задаются публичные `VITE_GOOGLE_CLIENT_ID`, `VITE_VK_CLIENT_ID`, `VITE_YANDEX_CLIENT_ID`. Пустое значение отключает соответствующую кнопку. После изменения `.env` перезапустите Vite или пересоберите сайт. Секретные ключи провайдеров в `VITE_*` не добавляются. Кнопки доступны на первом шаге `/auth`; после входа сохраняется возврат к выбранной покупке.

Настройки Laravel находятся в `config/social.php` и `.env`: `GOOGLE_WEB_CLIENT_ID` должен совпадать с `VITE_GOOGLE_CLIENT_ID`; `VK_WEB_CLIENT_ID` и `YANDEX_WEB_CLIENT_ID` — с соответствующими значениями React. `AZP_KEY`, `VK_CLIENT_ID`, `YANDEX_CLIENT_ID` относятся к Android: существующие значения нужно сохранить. API использует прежние `/api/auth/loginGoogle`, `/api/auth/loginVk`, `/api/auth/loginYandex`; для VK/Яндекса браузер дополнительно передаёт публичный `clientId`, который проверяется по серверной конфигурации. Браузер Google передаёт `accessToken`; сервер проверяет клиент, срок действия и профиль у Google. Android продолжает передавать `idToken` в тот же метод.

- Google Cloud: OAuth-клиент типа **Web application**. Добавьте JavaScript origins `https://gagara-fun.ru` и, для разработки, `http://localhost:5173` / `http://127.0.0.1:5173`. Используется popup Google Identity Services, redirect URI для него не нужен. Консоль: <https://console.cloud.google.com/apis/credentials>.
- VK ID: настройте веб-приложение для своего домена, разрешённый redirect URL — `https://gagara-fun.ru/auth`. При разработке зарегистрируйте также фактический адрес `/auth` своего dev-сервера, если кабинет разрешает этот origin. SDK использует popup, callback и PKCE. Консоль: <https://id.vk.com/about/business/go>.
- Яндекс ID: веб-платформа и redirect URI `https://gagara-fun.ru/yandex-auth.html`; для разработки — такой же путь на dev-origin. Права профиля должны позволять получить идентификатор и имя (`login:info`). Callback и `/auth` должны находиться на одном origin. Консоль: <https://oauth.yandex.ru/>.

Вместе со сборкой нужно выложить `yandex-auth.html` и `yandex-auth.js` из `dist`, а также PHP-изменения и настройки Laravel; после изменения серверной конфигурации выполните `php artisan config:clear`. Callback Яндекса передаёт результат только открывшему его окну того же origin; окно входа дополнительно проверяет источник сообщения и одноразовый `state`. Токен удаляется из адресной строки callback и не сохраняется в localStorage.

Все три видимых значка — локальные официальные PNG в `src/assets/img`: [цветной Google G](https://developers.google.com/static/identity/images/g-logo.png) из [материалов Google Identity](https://developers.google.com/identity/branding-guidelines), [синий VK](https://vk.com/images/brand/vk-logo.png) со [страницы бренда VK](https://vk.com/brand), [Яндекс 192×192](https://yastatic.net/s3/home-static/_/nova3/Bbcs5LWW2.png) — значок с главной `https://ya.ru/`. Исходные файлы используются без перекрашивания, обрезки и изменения формы; белые поля PNG VK и визуальный размер Google учитываются в CSS. Кнопки всегда остаются на странице. Google использует popup Google Identity Services, VK — VK ID SDK, Яндекс — OAuth popup с прежним redirect URI.

Все технические изображения хранятся в `src/assets/img` и подключаются импортами, включая логотип, кнопки и значки. Единственный фавикон — `public/favicon.png`. В `public/img` находятся только иллюстрации `about-city.png` и `cats.webp`: их постоянные публичные адреса используются страницами и Open Graph, включая серверные метатеги Laravel.

Реальный вход зависит от настроек доменов, разрешений и публикации OAuth-приложений в кабинетах провайдеров. Проверки с тестовыми ответами SDK и API не заменяют вход реальным аккаунтом после настройки.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
