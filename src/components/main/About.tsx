import questsStyle from '../../styles/questsStyle.module.css'

import mainStyle from '../../styles/mainStyle.module.css'

export const About = () => {
    return (
        <section className={mainStyle.mainAbout}>
            <div className={mainStyle.mainAboutInner}>
                <div className={mainStyle.shrinkable}>
                    <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                        О ПРОЕКТЕ
                    </div>

                    <h2 className={mainStyle.sectionHeading}>
                        Обычная прогулка.
                        <br />
                        Необычные открытия.
                    </h2>

                    <p className={`${mainStyle.bodyText} ${mainStyle.mb24}`}>
                        Гагара Тур превращает город в пространство для маленьких
                        приключений. Выбирайте маршрут, исследуйте улицы,
                        решайте загадки и узнавайте новые истории в своём темпе.
                    </p>

                </div>

                <div className={mainStyle.mainAboutVisual}>
                    <img
                        src="/about-city.png"
                        alt="Путешественница с картой на фоне исторического города"
                        className={mainStyle.coverImage}
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    )
}
