export const imageAlt = (element: string, title?: unknown): string => {
    const name = typeof title === 'string' || typeof title === 'number'
        ? String(title).trim()
        : ''

    return `Изображение ${element}${name ? ` «${name}»` : ''}`
}
