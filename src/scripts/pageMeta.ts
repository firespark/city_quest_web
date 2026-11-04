import { OPEN_GRAPH, type PageMeta } from '../config/pages.ts'

export const pageTitle = (title: string, siteName = OPEN_GRAPH.siteName) =>
    title === siteName || title.endsWith(` | ${siteName}`) ? title : `${title} | ${siteName}`

export const contentDescription = (content: unknown): string => {
    const entities: Record<string, string> = {
        nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>',
        laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…',
    }
    const text = (Array.isArray(content) ? content.join(' ') : typeof content === 'string' ? content : '')
        .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, key: string) => {
            if (!key.startsWith('#')) return entities[key.toLowerCase()] ?? match
            const code = key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : Number(key.slice(1))
            return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match
        })
        .replace(/\s+/g, ' ').trim()
    return text.length > 200 ? text.slice(0, 197).replace(/\s+\S*$/, '') + '…' : text
}

export const resolvePageMeta = (meta: PageMeta, path: string, siteUrl: string) => {
    const graph = { ...OPEN_GRAPH, ...meta.openGraph }
    const url = new URL(meta.canonical || path, siteUrl)
    url.search = ''
    url.hash = ''
    const image = { ...graph.image, url: new URL(graph.image.url, siteUrl).href }
    const title = pageTitle(meta.title)
    const ogTitle = meta.openGraph?.title ?? title
    const description = meta.openGraph?.description ?? meta.description
    return {
        title,
        canonical: /\b(?:noindex|none)\b/i.test(meta.robots) ? null : url.href,
        tags: [
            ['name', 'description', meta.description],
            ['name', 'robots', meta.robots],
            ['property', 'og:title', ogTitle],
            ['property', 'og:description', description],
            ['property', 'og:type', graph.type],
            ['property', 'og:site_name', graph.siteName],
            ['property', 'og:locale', graph.locale],
            ['property', 'og:url', url.href],
            ['property', 'og:image', image.url],
            ['property', 'og:image:secure_url', image.url.startsWith('https:') ? image.url : null],
            ['property', 'og:image:alt', image.alt],
            ['property', 'og:image:type', image.type ?? null],
            ['property', 'og:image:width', image.width == null ? null : String(image.width)],
            ['property', 'og:image:height', image.height == null ? null : String(image.height)],
            ['name', 'twitter:card', 'summary_large_image'],
            ['name', 'twitter:title', ogTitle],
            ['name', 'twitter:description', description],
            ['name', 'twitter:image', image.url],
            ['name', 'twitter:image:alt', image.alt],
        ] as Array<['name' | 'property', string, string | null]>,
    }
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]!)

export const renderPageHead = (meta: ReturnType<typeof resolvePageMeta>) => [
    `<title>${escapeHtml(meta.title)}</title>`,
    ...meta.tags.filter((tag): tag is ['name' | 'property', string, string] => tag[2] !== null)
        .map(([attribute, name, content]) => `<meta ${attribute}="${name}" content="${escapeHtml(content)}">`),
    ...(meta.canonical ? [`<link rel="canonical" href="${escapeHtml(meta.canonical)}">`] : []),
].join('\n    ')
