
import type { ReactNode } from 'react'

import FullWidthImage from '../common/FullWidthImage'
import mainStyle from '../../styles/mainStyle.module.css'

export const Hint = ({ text, image, alt }: {
    text: unknown
    image: unknown
    alt: string
}) => {

    return (
        <div className={mainStyle.mt24}>
            <div className={`${mainStyle.description} ${mainStyle.textThin} ${mainStyle.textCenter}`}>
                Подсказка:
            </div>

            {image ? (
                <FullWidthImage source={{ uri: image as string }} alt={alt} />
            ) : null}

            <div className={`${mainStyle.description} ${mainStyle.mt24}`}>
                {text as ReactNode}
            </div>
        </div>
    )
}
