
import type { ComponentProps } from 'react'

import questDetailStyle from '../../../styles/questDetailStyle.module.css'

import { StartButton } from '../StartButton'
import { ResetButton } from '../ResetButton'
import { RegisterButton } from '../RegisterButton'
import { BuyButton } from '../BuyButton'


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
            <div className={questDetailStyle.purchasePanel}>
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
        <div className={questDetailStyle.finalAction}>

            <div className={questDetailStyle.finalInfo}>

                <strong className={questDetailStyle.finalTitle}>
                    {title}
                </strong>

                {status && (
                    <div className={questDetailStyle.finalMeta}>

                        {status === 'in_progress' && (
                            <span className={questDetailStyle.finalStatus}>
                                В процессе
                            </span>
                        )}

                        {status === 'finished' && (
                            <span
                                className={`
                                    ${questDetailStyle.finalStatus}
                                    ${questDetailStyle.finalStatusFinished}
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

            <div className={questDetailStyle.finalButton}>
                <StartButton
                    changeScreen={changeScreen}
                    progress={progress}
                />
            </div>

        </div>
    )
}
