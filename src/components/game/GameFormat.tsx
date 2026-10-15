
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

type GameFormatProps = {
    selectedId: number
    setSelectedId: Dispatch<SetStateAction<number>>
}

export const GameFormat = ({ selectedId, setSelectedId }: GameFormatProps) => {

    const formats = [
        {
            id: 1,
            title: 'Квест',
            description: 'Прогулка по достопримечательностям сделана в виде квеста. Чтобы перейти к достопримечательности, нужно сначала разгадать ее название, а затем ответить на вопрос по посещенной локации.'
        },
        {
            id: 2,
            title: 'Экскурсия',
            description: 'Просто экскурсия по достопримечательностям, без загадок.'
        }
    ]

    return (
        <div className={gameStyle.modeListContainer}>
            {formats.map((format) => {
                const isSelected = selectedId === format.id

                return (
                    <div className={mainStyle.mb5} key={format.id}>
                        <button
                            type="button"
                            className={`${mainStyle.radioCard} ${isSelected ? mainStyle.radioCardActive : ''}`}
                            onClick={() => setSelectedId(format.id)}
                        >
                            <div className={gameStyle.modeRadioContainer}>
                                <div className={`${mainStyle.radioOuter} ${isSelected ? mainStyle.radioOuterActive : ''}`}>
                                    {isSelected ? (
                                        <div className={mainStyle.radioInner} />
                                    ) : null}
                                </div>
                            </div>

                            <div className={gameStyle.modeTextContainer}>
                                <div
                                    className={[
                                        mainStyle.subtitle,
                                        mainStyle.mt5,
                                        mainStyle.mb5,
                                        isSelected ? gameStyle.modeTitleActive : ''
                                    ].filter(Boolean).join(' ')}
                                >
                                    {format.title}
                                </div>

                                <div className={`${mainStyle.description} ${mainStyle.mb10}`}>
                                    {format.description}
                                </div>
                            </div>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
