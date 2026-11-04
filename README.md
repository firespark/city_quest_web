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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
