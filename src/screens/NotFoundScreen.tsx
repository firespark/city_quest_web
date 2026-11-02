import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { PAGES } from '../config/pages'
import { setDynamicPageTitle } from '../LayoutMeta'
import { ROUTES } from '../routes'

import mainStyle from '../styles/mainStyle.module.css'
import notFoundStyle from '../styles/notFoundStyle.module.css'

export const NotFoundScreen = () => {
    useEffect(() => {
        setDynamicPageTitle(PAGES.NOT_FOUND.meta.title)
    }, [])

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>
                <div className={notFoundStyle.page}>
                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: ROUTES.HOME },
                            { label: 'Страница не найдена' }
                        ]}
                    />

                    <div className={notFoundStyle.content}>
                        <p className={notFoundStyle.code}>
                            404
                        </p>

                        <h1 className={notFoundStyle.title}>
                            Страница не найдена
                        </h1>

                        <p className={notFoundStyle.description}>
                            Проверь адрес или вернись на главную,
                            чтобы выбрать город и квест.
                        </p>

                        <Link
                            to={ROUTES.HOME}
                            className={mainStyle.siteButton}
                        >
                            На главную
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}