
import { Link } from 'react-router-dom'

import { slugUrl } from '../../routes'
import mainStyle from '../../styles/mainStyle.module.css'

export const Hero = () => {
    return (
        <section className={mainStyle.hero}>
            <div className={mainStyle.heroContent}>

                <div className={mainStyle.heroEyebrow}>
                    ГАГАРА ТУР · СКОРО НОВЫЙ КВЕСТ
                </div>

                <h1 className={mainStyle.heroTitle}>
                    Город готовит
                    <span> новую тайну.</span>
                </h1>

                <p className={mainStyle.heroDescription}>
                    Мы готовим новое городское приключение.
                    Впереди загадки, открытия и маршрут,
                    который захочется пройти.
                </p>

                <Link
                    to={slugUrl('tbilisi-trip1')}
                    className={mainStyle.siteButton}
                >
                    Начать приключение
                </Link>

            </div>

            <div className={mainStyle.heroVisual}>
                <img
                    src="/cats.webp"
                    alt="Городской квест Котики в Тбилиси"
                    className={mainStyle.heroImage}
                />
            </div>
        </section>
    )
}
