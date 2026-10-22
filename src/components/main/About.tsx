
import mainStyle from '../../styles/mainStyle.module.css'

export const About = () => {
    return (
        <section className={mainStyle.mainAbout}>
            <div className={mainStyle.mainAboutInner}>
                <div className={mainStyle.mainAboutContent}>
                    <div className={mainStyle.heroEyebrow}>
                        О ПРОЕКТЕ
                    </div>

                    <h2 className={mainStyle.mainAboutTitle}>
                        Обычная прогулка.
                        <br />
                        Необычные открытия.
                    </h2>

                    <p className={mainStyle.mainAboutDescription}>
                        Гагара Тур превращает город в пространство для маленьких
                        приключений. Выбирайте маршрут, исследуйте улицы,
                        решайте загадки и узнавайте новые истории в своём темпе.
                    </p>

                    <div className={mainStyle.mainAboutTags}>
                        <span className={mainStyle.mainAboutTag}>
                            + Реальные места
                        </span>
                        <span className={mainStyle.mainAboutTag}>
                            + Необычные маршруты
                        </span>
                    </div>
                </div>

                <div className={mainStyle.mainAboutVisual}>
                    <img
                        src="/about-city.png"
                        alt="Путешественница с картой на фоне исторического города"
                        className={mainStyle.mainAboutImage}
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    )
}
