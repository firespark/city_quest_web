import questsStyle from '../../styles/questsStyle.module.css'
import questDetailStyle from '../../styles/questDetailStyle.module.css'

import { Link } from 'react-router-dom'

import { slugUrl } from '../../routes'
import mainStyle from '../../styles/mainStyle.module.css'

export const Hero = () => {
    return (
        <section className={mainStyle.landingHero}>
            <div className={mainStyle.landingHeroContent}>

                <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                    ГАГАРА ТУР · СКОРО НОВЫЙ КВЕСТ
                </div>

                <h1 className={questDetailStyle.heroTitle}>
                    Городской квест
                    <span className={mainStyle.blue}> Котики в Тбилиси</span>
                </h1>

                <p className={mainStyle.heroDescription}>
                    Мы готовим новое городское приключение.
                    Впереди загадки, открытия и маршрут,
                    который захочется пройти.
                </p>

                <Link
                    to={slugUrl('tbilisi-cats')}
                    className={mainStyle.siteButton}
                >
                    Начать приключение
                </Link>

            </div>

            <div className={mainStyle.heroVisual}>
                <img
                    src="/cats.webp"
                    alt="Городской квест Котики в Тбилиси"
                    className={mainStyle.coverImage}
                />
            </div>
        </section>
    )
}
