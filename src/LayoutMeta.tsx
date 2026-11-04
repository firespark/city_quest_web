
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { SITE } from './config/site'
import { PAGES } from './config/pages'
import { getPageByPath } from './routes'
import { resolvePageMeta } from './scripts/pageMeta'
import type { PageMeta, OpenGraphImage } from './config/pages'

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


const setCanonical = (url: string | null) => {
    let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (url === null) {
        element?.remove()
        return
    }
    if (!element) {
        element = document.createElement('link')
        element.rel = 'canonical'
        document.head.appendChild(element)
    }
    element.href = url
}

const applyPageMeta = (meta: PageMeta, path: string) => {
    const resolved = resolvePageMeta(meta, path, SITE.url)
    document.title = resolved.title
    resolved.tags.forEach(([attribute, name, content]) => setMeta(attribute, name, content))
    setCanonical(resolved.canonical)
}

export const setDynamicPageTitle = (
    title: string,
    indexable?: boolean,
    details?: { description: string; image?: OpenGraphImage }
) => {
    const base = indexable === undefined ? PAGES.NOT_FOUND.meta : PAGES.SLUG.meta
    applyPageMeta({
        ...base,
        title,
        ...(details ? { description: details.description, openGraph: details.image ? { image: details.image } : undefined } : {}),
        robots: indexable ? 'index, follow' : 'noindex, nofollow',
    }, window.location.pathname)
}

export const LayoutMeta = () => {

    const location = useLocation()

    useEffect(() => {
        const page = getPageByPath(location.pathname)

        const pagePath = page && !/[:*]/.test(page.path)
            ? page.path
            : location.pathname
        // Preserve Laravel's metadata for this slug until its API data arrives.
        const renderedUrl = document.head.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.content
        if (page?.path.includes(':') && renderedUrl === new URL(pagePath, SITE.url).href) return
        applyPageMeta(page?.meta ?? PAGES.NOT_FOUND.meta, pagePath)
    }, [location.pathname])

    return null
}
