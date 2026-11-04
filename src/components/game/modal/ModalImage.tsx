
import FullWidthImage from '../../common/FullWidthImage'

import gameStyle from '../../../styles/gameStyle.module.css'

type ModalImageProps = {
    image: string
    alt: string
}

export const ModalImage = ({ image, alt }: ModalImageProps) => {
    return (
        <div className={gameStyle.fullWidthImageBg}>
            <FullWidthImage source={{ uri: image }} alt={alt} />
        </div>
    )
}
