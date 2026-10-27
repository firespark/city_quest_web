
import type { ComponentProps } from 'react'

import detailStyle from '../../styles/questDetailStyle.module.css'

import { StartButton } from './StartButton'
import { ResetButton } from './ResetButton'
import { RegisterButton } from './RegisterButton'
import { BuyButton } from './BuyButton'

type QuestDetailButtonProps = {
    questId: number
    title: string
    available: boolean
    isAuth: boolean
    status: 'finished' | 'in_progress' | null
    progress: string
    changeScreen: ComponentProps<typeof StartButton>['changeScreen']
    onPurchaseSuccess: ComponentProps<typeof BuyButton>['onSuccess']
    setModalVisible: ComponentProps<typeof ResetButton>['setModalVisible']
}

export const QuestDetailButton = ({
    questId,
    title,
    available,
    isAuth,
    status,
    progress,
    changeScreen,
    onPurchaseSuccess,
    setModalVisible
}: QuestDetailButtonProps) => {

    if (!available) {
        return (
            <div className={detailStyle.purchasePanel}>
                {isAuth ? (
                    <BuyButton
                        questId={questId}
                        onSuccess={onPurchaseSuccess}
                    />
                ) : (
                    <RegisterButton />
                )}
            </div>
        )
    }

    return (
        <div className={detailStyle.finalAction}>

            <div className={detailStyle.finalInfo}>

                <strong className={detailStyle.finalTitle}>
                    {title}
                </strong>

                {status && (
                    <div className={detailStyle.finalMeta}>

                        {status === 'in_progress' && (
                            <span className={detailStyle.finalStatus}>
                                В процессе
                            </span>
                        )}

                        {status === 'finished' && (
                            <span
                                className={`
                                    ${detailStyle.finalStatus}
                                    ${detailStyle.finalStatusFinished}
                                `}
                            >
                                Пройден
                            </span>
                        )}

                        <ResetButton
                            setModalVisible={setModalVisible}
                        />

                    </div>
                )}

            </div>

            <div className={detailStyle.finalButton}>
                <StartButton
                    changeScreen={changeScreen}
                    progress={progress}
                />
            </div>

        </div>
    )
}
