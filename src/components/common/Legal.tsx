import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import legalStyle from '../../styles/legalStyle.module.css'

import { LEGAL } from '../../config/legal'
import { ROUTES } from '../../routes'

import { Breadcrumbs } from './Breadcrumbs'

type LegalProps = {
    title: string
    children: ReactNode
}

const details = [
    ['Владелец сервиса', LEGAL.operatorName],
    ['Правовой статус', LEGAL.legalForm],
    ['Страна регистрации', LEGAL.registrationCountry],
    ['Регистрационный номер', LEGAL.registrationNumber],
    ['Налоговый номер', LEGAL.taxNumber],
    ['Адрес', LEGAL.address],
    ['D-U-N-S', LEGAL.duns],
    ['Сайт', LEGAL.website]
] as const

export const Legal = ({ title, children }: LegalProps) => {
    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <main className={`${mainStyle.pageBackground} ${mainStyle.mainScreenScroll}`}>

                <div className={legalStyle.page}>

                    <Breadcrumbs
                        items={[
                            { label: 'Главная', to: ROUTES.HOME },
                            { label: title }
                        ]}
                    />

                    <article>

                        <h1 className={legalStyle.pageTitle}>
                            {title}
                        </h1>

                        <p className={legalStyle.revision}>
                            Редакция от {LEGAL.revisionDate}
                        </p>

                        <div className={legalStyle.content}>

                            {children}

                            <section>

                                <h2>Реквизиты и контакты</h2>

                                <dl className={legalStyle.details}>

                                    {details.map(([label, value]) => (
                                        <div key={label}>
                                            <dt>{label}</dt>
                                            <dd>{value}</dd>
                                        </div>
                                    ))}

                                    <div>
                                        <dt>Поддержка и обращения</dt>

                                        <dd>
                                            <a href={`mailto:${LEGAL.supportEmail}`}>
                                                {LEGAL.supportEmail}
                                            </a>
                                        </dd>
                                    </div>

                                </dl>

                            </section>

                        </div>

                    </article>

                    <nav
                        className={legalStyle.documentsNav}
                        aria-label="Юридические документы"
                    >
                        <Link to={ROUTES.USER_AGREEMENT}>
                            Пользовательское соглашение
                        </Link>

                        <Link to={ROUTES.PRIVACY_POLICY}>
                            Политика конфиденциальности
                        </Link>
                    </nav>

                </div>

            </main>

        </div>
    )
}