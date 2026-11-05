import { APP_STORES } from '../../config/app'
import rustoreIcon from '../../assets/img/rustore.png'
import googlePlayIcon from '../../assets/img/google-play.png'
import mainStyle from '../../styles/mainStyle.module.css'
import questsStyle from '../../styles/questsStyle.module.css'

type AppDownloadsProps = {
    store?: 'rustore' | 'googlePlay'
    showPaymentHint?: boolean
}

export const AppDownloads = ({ store, showPaymentHint = false }: AppDownloadsProps) => {
    const stores = [
        {
            key: 'rustore',
            name: 'RuStore',
            label: 'Скачать из RuStore',
            url: APP_STORES.rustore,
            icon: rustoreIcon,
        },
        {
            key: 'googlePlay',
            name: 'Google Play',
            label: 'Скачать из Google Play',
            url: APP_STORES.googlePlay,
            icon: googlePlayIcon,
        },
    ]

    return (
        <div className={questsStyle.downloads}>
            <div className={questsStyle.storeButtons}>
                {stores.filter(item => !store || item.key === store).map(item => {
                    const content = (
                        <>
                            <span className={questsStyle.storeIcon} aria-hidden="true">
                                <img src={item.icon} alt={`Изображение логотипа ${item.name}`} />
                            </span>
                            <span>{item.label}</span>
                        </>
                    )
                    const className = `${mainStyle.siteButton} ${questsStyle.storeButton} ${questsStyle.storeButtonLight}`

                    return item.url ? (
                        <a key={item.name} className={className} href={item.url} target="_blank" rel="noopener noreferrer">{content}</a>
                    ) : (
                        <button key={item.name} type="button" className={className} disabled title={`Ссылка на ${item.name} пока не задана`}>{content}</button>
                    )
                })}
            </div>
            {showPaymentHint && (
                <div className={`${mainStyle.bodyText} ${questsStyle.downloadHint}`}>Если в будущем планируешь покупать квесты за рубли, скачай приложение из RuStore.</div>
            )}
        </div>
    )
}
