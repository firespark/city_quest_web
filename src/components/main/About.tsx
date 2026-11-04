import questsStyle from '../../styles/questsStyle.module.css'

import mainStyle from '../../styles/mainStyle.module.css'

export const About = () => {
    return (
        <div className={mainStyle.mainAbout}>
            <div className={mainStyle.mainAboutInner}>
                <div className={mainStyle.shrinkable}>
                    <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                        О ПРОЕКТЕ
                    </div>

                    <div className={mainStyle.h2}>Обычная прогулка.<br />Необычные открытия.</div>

                    <div className={`${mainStyle.bodyText} ${mainStyle.mb24}`}>Гагара Тур превращает город в пространство для маленьких приключений. Выбирай маршрут, исследуй улицы, решай загадки и узнавай новые истории в своём темпе.</div>

                </div>

                <div className={mainStyle.mainAboutVisual}>
                    <img
                        src="/about-city.png"
                        alt="Изображение блока «О проекте»: путешественница с картой на фоне исторического города"
                        className={mainStyle.coverImage}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    )
}
