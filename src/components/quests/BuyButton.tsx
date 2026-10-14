
import mainStyle from '../../styles/mainStyle.module.css'

export const BuyButton = (_props: {
    questId: number
    onSuccess?: () => void | Promise<void>
}) => {

    return (
        <div className={mainStyle.center}>
            <button
                type="button"
                className={mainStyle.buttonBuy}
                disabled
                title="Оплата на сайте пока недоступна"
            >
                <span className={mainStyle.buttonText}>Купить тур</span>
            </button>
        </div>
    )
}
