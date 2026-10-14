
import { useState, useContext, useEffect, useRef } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import modalStyle from '../../styles/modalStyle.module.css'

import { Loader } from '../common/Loader'
import { Error } from '../common/Error'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

export const ResetModal = ({ modalVisible, setModalVisible, onSuccess }: {
    modalVisible: boolean
    setModalVisible: (visible: boolean) => void
    onSuccess?: () => void | Promise<void>
}) => {

    const { questId, token } = useContext(MainContext)

    const [comment, setComment] = useState('')
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const modalRef = useRef<HTMLDialogElement>(null)

    const closeModal = () => {
        setModalVisible(false)
        setError(null)
        setComment('')
    }

    useEffect(() => {
        const modal = modalRef.current

        if (modalVisible && !modal?.open) {
            modal?.showModal()
        } else if (!modalVisible && modal?.open) {
            modal.close()
        }
    }, [modalVisible])

    const resetProgress = async () => {
        if (comment.trim().toLowerCase() === 'подтверждаю') {
            const postdata = {}
            setError(null)
            setLoader(true)

            try {
                const output = await Http.post(
                    `${import.meta.env.VITE_API_URL}/games/reset/${questId}`,
                    postdata,
                    token
                )

                if (output.success == 1) {
                    closeModal()
                    if (onSuccess) {
                        onSuccess()
                    }
                }
                else {
                    setError(output.error || 'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
                }
            }
            catch (e) {
                console.error('Error:', e)
                setError('Возникли ошибки. Пожалуйста, сообщите разработчикам об этом')
            }
            finally {
                setLoader(false)
            }
        } else if (comment.trim().length > 0) {
            setError('Введите слово "Подтверждаю" без ошибок')
        }
    }

    return (
        <dialog
            ref={modalRef}
            className={modalStyle.countriesDialog}
            onCancel={(event) => {
                event.preventDefault()
                closeModal()
            }}
        >
            <div
                className={modalStyle.countriesModalOverlay}
                onClick={closeModal}
            >
                <div
                    className={modalStyle.countriesBottomSheet}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className={modalStyle.countriesDragIndicator} />

                    {loader ? (
                        <div style={{ paddingTop: 40, paddingBottom: 40 }}>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className={modalStyle.countriesSheetTitle}>
                                Сброс прогресса
                            </div>

                            <div className={mainStyle.mb25}>
                                <div className={`${mainStyle.errorText} ${mainStyle.mb15}`}>
                                    Это действие нельзя отменить. Если вы действительно хотите сбросить прогресс и начать квест-тур заново, введите слово <span className={mainStyle.textBold}>Подтверждаю</span> в поле ниже.
                                </div>

                                <input
                                    type="text"
                                    placeholder="Подтверждаю"
                                    className={mainStyle.modernInput}
                                    onChange={(event) => {
                                        setComment(event.target.value)
                                        setError(null)
                                    }}
                                    value={comment}
                                    autoCapitalize="none"
                                />

                                {error && (
                                    <div className={mainStyle.mt10}>
                                        <Error text={error} />
                                    </div>
                                )}
                            </div>

                            <div className={mainStyle.center}>
                                <button
                                    type="button"
                                    className={`${mainStyle.dangerButton} ${mainStyle.mb15}`}
                                    onClick={resetProgress}
                                >
                                    <span className={mainStyle.dangerButtonText}>
                                        Сбросить прогресс
                                    </span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className={modalStyle.countriesCancelButton}
                            >
                                <span className={modalStyle.countriesCancelText}>
                                    Отмена
                                </span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </dialog>
    )
}
