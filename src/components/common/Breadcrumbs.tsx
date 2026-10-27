import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'

type BreadcrumbItem = {
    label: string
    to?: string
}

type BreadcrumbsProps = {
    items: BreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav
            className={mainStyle.breadcrumbs}
            aria-label="Навигация по разделам"
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1

                return (
                    <Fragment key={index}>
                        {index > 0 && (
                            <span aria-hidden="true">›</span>
                        )}

                        {isLast ? (
                            <span aria-current="page">
                                {item.label}
                            </span>
                        ) : item.to ? (
                            <Link to={item.to}>
                                {item.label}
                            </Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </Fragment>
                )
            })}
        </nav>
    )
}