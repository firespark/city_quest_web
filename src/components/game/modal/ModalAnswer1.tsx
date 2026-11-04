import { imageAlt } from '../../../scripts/imageAlt'


import { useContext, type Dispatch, type SetStateAction, type ReactNode } from 'react'
import { IoLocationSharp, IoCompassOutline } from 'react-icons/io5'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { MainContext } from '../../../context/mainContext'
import { FormattedContent } from '../../common/FormattedContent'

type ModalAnswer1Props = {
    title: unknown
    image: unknown
    address: unknown
    location: string
    description: unknown
    setModal: Dispatch<SetStateAction<string | null>>
}

export const ModalAnswer1 = ({ title, image, address, location, description, setModal }: ModalAnswer1Props) => {

    const { setAnswersState } = useContext(MainContext)

    return (
        <div className={mainStyle.mt8}>

            <div className={mainStyle.card}>
                <div className={`${gameStyle.gameSuccessTitle} ${mainStyle.mt12} ${mainStyle.heading}`}>
                    ВЕРНО!
                </div>

                {title ? (
                    <div className={`${gameStyle.answerTitle} ${mainStyle.mb12} ${mainStyle.heading}`}>
                        {title as ReactNode}
                    </div>
                ) : null}
            </div>

            {(image || address || location) ? (
                <div className={`${mainStyle.card} ${mainStyle.mt16}`}>

                    {image ? (
                        <div className={gameStyle.modalAnswerImageBg}>
                            <img
                                src={image as string}
                                className={gameStyle.sightImage}
                                alt={imageAlt('достопримечательности', title)}
                            />
                        </div>
                    ) : null}

                    {(address || location) ? (
                        <div className={mainStyle.p20}>
                            {address ? (
                                <div className={gameStyle.gameDetailRow}>
                                    <div className={gameStyle.gameIconWrapper}>
                                        <IoLocationSharp size={18} className={mainStyle.blue} />
                                    </div>

                                    <div className={gameStyle.gameDetailValue}>
                                        {address as ReactNode}
                                    </div>
                                </div>
                            ) : null}

                            {location ? (
                                <div className={gameStyle.gameDetailRow}>
                                    <div className={gameStyle.gameIconWrapper}>
                                        <IoCompassOutline size={18} className={mainStyle.blue} />
                                    </div>

                                    <a
                                        href={`geo:0,0?q=${location}`}
                                        className={gameStyle.gameLink}
                                    >
                                        {location}
                                    </a>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            ) : null}

            {description ? (
                <div className={`${mainStyle.card} ${mainStyle.mt16}`}>
                    <FormattedContent text={description} />
                </div>
            ) : null}

            <div className={mainStyle.mt16}>
                <button
                    type="button"
                    className={mainStyle.primaryButton}
                    onClick={() => {
                        setAnswersState([])
                        setModal(null)
                    }}
                >
                    <span className={mainStyle.primaryButtonText}>
                        Продолжить
                    </span>
                </button>
            </div>

        </div>
    )
}
