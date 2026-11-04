import { Link } from 'react-router-dom'

import { purchaseUrl } from '../../../routes'
import { AppDownloads } from '../../common/AppDownloads'
import mainStyle from '../../../styles/mainStyle.module.css'

export type QuestAppActionProps = {
    slug: string
    paid: boolean
    available: boolean
    showPaymentHint?: boolean
}

export const QuestAppAction = ({ slug, paid, available, showPaymentHint = false }: QuestAppActionProps) => {
    return paid && !available ? (
        <Link to={purchaseUrl(slug)} className={`${mainStyle.siteButton} ${mainStyle.siteButtonPurchase}`}>Купить квест</Link>
    ) : (
        <AppDownloads showPaymentHint={showPaymentHint && !paid} />
    )
}
