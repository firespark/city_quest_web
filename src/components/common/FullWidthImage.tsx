
import { useState, type CSSProperties } from 'react'

import gameStyle from '../../styles/gameStyle.module.css'

import { Loader } from './Loader'

type FullWidthImageProps = {
    source: { uri: string } | string
    ratio?: number
    style?: string | CSSProperties
}

export default function FullWidthImage(props: FullWidthImageProps) {
    const [isLoading, setIsLoading] = useState(true)

    const imageSource = typeof props.source === 'string'
        ? props.source
        : props.source.uri

    return (
        <div style={{ position: 'relative', width: '100%' }}>

            {isLoading && (
                <div className={gameStyle.fullWidthImageLoader}>
                    <Loader />
                </div>
            )}

            <img
                src={imageSource}
                alt=""
                style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    ...(props.ratio ? { aspectRatio: 1 / props.ratio } : {})
                }}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </div>
    )
}
