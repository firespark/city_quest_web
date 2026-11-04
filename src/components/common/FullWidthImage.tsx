
import { useState, type CSSProperties } from 'react'

import gameStyle from '../../styles/gameStyle.module.css'
import mainStyle from '../../styles/mainStyle.module.css'

import { Loader } from './Loader'

type FullWidthImageProps = {
    source: { uri: string } | string
    alt: string
    style?: string | CSSProperties
}

export default function FullWidthImage(props: FullWidthImageProps) {
    const [isLoading, setIsLoading] = useState(true)

    const imageSource = typeof props.source === 'string'
        ? props.source
        : props.source.uri

    return (
        <div className={mainStyle.blockRelative}>

            {isLoading && (
                <div className={gameStyle.fullWidthImageLoader}>
                    <Loader />
                </div>
            )}

            <img
                src={imageSource}
                alt={props.alt}
                className={gameStyle.fullWidthImage}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </div>
    )
}
