
import mainStyle from '../../styles/mainStyle.module.css'

export const FormattedContent = ({ text }: { text: unknown }) => {
    if (!text) return null

    const normalizedText = (Array.isArray(text) ? text.join('\n') : String(text))
        .replace(/<br\s*\/?>/gi, '\n')

    const lines = normalizedText.split('\n').filter(line => line.trim().length > 0)

    const parseInlineTags = (lineText: string, lineIndex: number) => {

        const regex = /(<(?:b|strong)>.*?<\/(?:b|strong)>)/gi
        const parts = lineText.split(regex)

        return parts.map((part, index) => {

            if (/^<(?:b|strong)>/i.test(part)) {
                const clean = part.replace(/<\/?(?:b|strong)>/gi, '')
                return (
                    <span key={`${lineIndex}-${index}`} className={mainStyle.textBold}>
                        {clean}
                    </span>
                )
            }

            return part
        })
    }

    return (
        <div className={mainStyle.container}>
            {lines.map((line, index) => {
                const trimmed = line.trim()

                if (/^[-—–]\s*/.test(trimmed)) {
                    const cleanText = trimmed.replace(/^[-—–]\s*/, '')
                    return (
                        <div key={index} className={mainStyle.bulletRow}>
                            <div className={mainStyle.bulletIconWrapper}>
                                <div className={mainStyle.bulletDot} />
                            </div>
                            <div className={mainStyle.bulletText}>
                                {parseInlineTags(cleanText, index)}
                            </div>
                        </div>
                    )
                }

                if (trimmed.startsWith('<h2>') || trimmed.endsWith('</h2>')) {
                    const cleanText = trimmed.replace(/<\/?h2>/g, '')
                    return (
                        <div key={index} className={mainStyle.subtitle}>
                            {parseInlineTags(cleanText, index)}
                        </div>
                    )
                }

                if (trimmed.startsWith('<h3>') || trimmed.endsWith('</h3>')) {
                    const cleanText = trimmed.replace(/<\/?h3>/g, '')
                    return (
                        <div key={index} className={mainStyle.thirdTitle}>
                            {parseInlineTags(cleanText, index)}
                        </div>
                    )
                }

                return (
                    <div key={index} className={mainStyle.paragraph}>
                        {parseInlineTags(trimmed, index)}
                    </div>
                )
            })}
        </div>
    )
}
