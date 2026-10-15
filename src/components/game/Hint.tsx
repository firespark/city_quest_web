
import type { ReactNode } from 'react'

import FullWidthImage from '../common/FullWidthImage'
import mainStyle from '../../styles/mainStyle.module.css'

export const Hint = ({ text, image }: {
    text: unknown
    image: unknown
}) => {

    return (
        <div className={mainStyle.mt20}>
            <div className={`${mainStyle.textThin} ${mainStyle.textCenter}`}>
                Подсказка:
            </div>

            {image ? (
                <FullWidthImage source={{ uri: image as string }} />
            ) : null}

            <div className={`${mainStyle.text} ${mainStyle.mt20}`}>
                {text as ReactNode}
            </div>
        </div>
    )
}
