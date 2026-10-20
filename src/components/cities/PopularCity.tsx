
import { Link } from 'react-router-dom'

import mainStyle from '../../styles/mainStyle.module.css'
import citiesStyle from '../../styles/citiesStyle.module.css'

import { slugUrl } from '../../routes'

export type PopularCityData = {
    id: number
    title: string
    image: string
    slug: string
}

export const PopularCity = ({ city }: { city: PopularCityData }) => {

    return (
        <Link
            to={slugUrl(city.slug)}
            className={citiesStyle.cityCardWrapper}
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
        </Link>
    )
}
