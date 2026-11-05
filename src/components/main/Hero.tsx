import questsStyle from '../../styles/questsStyle.module.css'
import questDetailStyle from '../../styles/questDetailStyle.module.css'

import { Link } from 'react-router-dom'

import { slugUrl } from '../../routes'
import mainStyle from '../../styles/mainStyle.module.css'

export const Hero = () => {
    return (
        <section className={mainStyle.landingHero}>
            <div className={`${mainStyle.landingHeroContent} ${questDetailStyle.heroContent}`}>

                <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                    ГАГАРА ТУР · СКОРО НОВЫЙ КВЕСТ
                </div>

                <h1>Городской квест<span className={mainStyle.blue}> Котики в Тбилиси</span></h1>

                <div className={mainStyle.heroDescription}>Мы готовим новое городское приключение. Впереди загадки, открытия и маршрут, который захочется пройти.</div>

                <Link
                    to={slugUrl('tbilisi-cats')}
                    className={mainStyle.siteButton}
                >
                    Начать приключение
                </Link>

            </div>

            <div className={mainStyle.heroVisual}>
                <img
                    src="/img/cats.webp"
                    alt="Изображение квеста «Котики в Тбилиси»"
                    className={mainStyle.coverImage}
                />
            </div>
        </section>
    )
}
