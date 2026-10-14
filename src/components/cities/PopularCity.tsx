
import { useContext } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import citiesStyle from '../../styles/citiesStyle.module.css'

import { QUESTS_SCREEN } from '../../context/types'
import { MainContext } from '../../context/mainContext'

export type PopularCityData = {
    id: number
    title: string
    image: string
}

export const PopularCity = ({ city }: { city: PopularCityData }) => {

    const { changeScreen, setCityData } = useContext(MainContext)

    return (
        <button
            type="button"
            className={citiesStyle.cityCardWrapper}
            onClick={() => {
                changeScreen(QUESTS_SCREEN)
                setCityData({ id: city.id, title: city.title })
            }}
        >
            <img
                src={city.image}
                className={citiesStyle.cityCardImage}
                alt=""
            />

            <div className={citiesStyle.cityInfoContainer}>
                <div className={citiesStyle.cityTitle}>
                    {city.title}
                </div>

                <div className={mainStyle.arrowContainer}>
                    <span className={mainStyle.pureArrow}>→</span>
                </div>
            </div>
        </button>
    )
}
