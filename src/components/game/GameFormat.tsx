
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
        <div className={mainStyle.formGroup}>
            {formats.map((format) => {
                const isSelected = selectedId === format.id

                return (
                    <div className={mainStyle.mb8} key={format.id}>
                        <button
                            type="button"
                            className={`${mainStyle.radioCard} ${isSelected ? mainStyle.radioCardActive : ''}`}
                            onClick={() => setSelectedId(format.id)}
                        >
                            <span className={gameStyle.modeRadioContainer}>
                                <span className={`${mainStyle.radioOuter} ${isSelected ? mainStyle.radioOuterActive : ''}`}>
                                    {isSelected ? (
                                        <span className={mainStyle.radioInner} />
                                    ) : null}
                                </span>
                            </span>

                            <span className={mainStyle.textColumn}>
                                <span className={[`${mainStyle.formTitle} ${mainStyle.mt16} ${mainStyle.mb16}`, mainStyle.heading, mainStyle.mt8, mainStyle.mb8, isSelected ? mainStyle.blue : ''].filter(Boolean).join(' ')}>{format.title}</span>

                                <span className={`${mainStyle.description} ${mainStyle.mb12}`}>
                                    {format.description}
                                </span>
                            </span>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
