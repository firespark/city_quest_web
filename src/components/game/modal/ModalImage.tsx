
import FullWidthImage from '../../common/FullWidthImage'

import gameStyle from '../../../styles/gameStyle.module.css'

type ModalImageProps = {
    image: string
}

export const ModalImage = ({ image }: ModalImageProps) => {
    return (
        <div className={gameStyle.fullWidthImageBg}>
            <FullWidthImage source={{ uri: image }} />
        </div>
    )
}
