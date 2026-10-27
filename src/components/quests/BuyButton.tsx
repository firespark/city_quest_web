
import mainStyle from '../../styles/mainStyle.module.css'

export const BuyButton = (_props: {
    questId: number
    onSuccess?: () => void | Promise<void>
}) => {

    return (
        <div className={mainStyle.center}>
            <button
                type="button"
                className={`${mainStyle.siteButton} ${mainStyle.siteButtonPurchase}`}
                disabled
                title="Оплата на сайте пока недоступна"
            >
                Купить тур
            </button>
        </div>
    )
}
