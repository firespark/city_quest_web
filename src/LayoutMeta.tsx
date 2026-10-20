
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { SITE } from './config/site'
import { PAGES } from './config/pages'
import { getPageByPath } from './routes'

type MetaData = {
    title: string
    description: string
    robots: string
    image?: string
    canonical?: string
}

const setMeta = (
    attribute: 'name' | 'property',
    name: string,
    content: string | null
) => {
    let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${name}"]`
    )

    if (content === null) {
        element?.remove()
        return
    }

    if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
    }

    element.content = content
}


export const setDynamicPageTitle = (title: string) => {
    const fullTitle = `${title} | ${SITE.name}`

    document.title = fullTitle

    setMeta('property', 'og:title', fullTitle)
    setMeta('name', 'twitter:title', fullTitle)
}


export const LayoutMeta = () => {

    const location = useLocation()

    useEffect(() => {
        const page = getPageByPath(location.pathname)

        const meta: MetaData = page?.meta ?? {
            title: PAGES.HOME.meta.title,
            description: PAGES.HOME.meta.description,
            robots: 'noindex, nofollow'
        }

        const url = new URL(
            meta.canonical || page?.path || location.pathname,
            window.location.origin
        ).href

        const image = meta.image
            ? new URL(meta.image, window.location.origin).href
            : null

        const title = page?.path === '/'
            ? meta.title
            : `${meta.title} | ${SITE.name}`

        document.title = title

        setMeta('name', 'description', meta.description)
        setMeta('name', 'robots', meta.robots)

        setMeta('property', 'og:title', meta.title)
        setMeta('property', 'og:description', meta.description)
        setMeta('property', 'og:type', 'website')
        setMeta('property', 'og:site_name', 'Гагара Тур')
        setMeta('property', 'og:locale', 'ru_RU')
        setMeta('property', 'og:url', url)
        setMeta('property', 'og:image', image)

        setMeta(
            'name',
            'twitter:card',
            image ? 'summary_large_image' : 'summary'
        )
        setMeta('name', 'twitter:title', meta.title)
        setMeta('name', 'twitter:description', meta.description)
        setMeta('name', 'twitter:image', image)

        let canonical = document.head.querySelector<HTMLLinkElement>(
            'link[rel="canonical"]'
        )

        if (page && !/\bnoindex\b/i.test(meta.robots)) {
            if (!canonical) {
                canonical = document.createElement('link')
                canonical.rel = 'canonical'
                document.head.appendChild(canonical)
            }

            canonical.href = url
        } else {
            canonical?.remove()
        }

    }, [location.pathname])

    return null
}
