
import { useState, useContext, useEffect, useRef } from 'react'

import modalStyle from '../../styles/modalStyle.module.css'

import { MainContext } from '../../context/mainContext'
import { Http } from '../../scripts/http'

type ResetModalProps = {
    modalVisible: boolean
    setModalVisible: (visible: boolean) => void
    onSuccess?: () => void | Promise<void>
}

export const ResetModal = ({
    modalVisible,
    setModalVisible,
    onSuccess
}: ResetModalProps) => {

    const { questId, token } = useContext(MainContext)

    const [comment, setComment] = useState('')
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const modalRef = useRef<HTMLDialogElement>(null)

    const isConfirmed =
        comment.trim().toLowerCase() === 'подтверждаю'

    const closeModal = () => {
        if (loader) return

        setModalVisible(false)
        setError(null)
        setComment('')
    }

    useEffect(() => {
        const modal = modalRef.current

        if (!modal) return

        if (modalVisible && !modal.open) {
            modal.showModal()
        } else if (!modalVisible && modal.open) {
            modal.close()
        }
    }, [modalVisible])

    const resetProgress = async () => {
        if (loader) return

        if (!isConfirmed) {
            if (comment.trim().length > 0) {
                setError('Введите слово "Подтверждаю" без ошибок')
            }
            return
        }

        setError(null)
        setLoader(true)

        try {
            const output = await Http.post(
                `${import.meta.env.VITE_API_URL}/games/reset/${questId}`,
                {},
                token
            )

            if (output.success === 1) {
                setModalVisible(false)
                setComment('')
                setError(null)

                if (onSuccess) {
                    void onSuccess()
                }
            } else {
                setError(
                    output.error ||
                    'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом'
                )
            }

        } catch (e) {
            console.error('Error:', e)
            setError(
                'Возникли ошибки. Пожалуйста, сообщите разработчикам об этом'
            )
        } finally {
            setLoader(false)
        }
    }

    return (
        <dialog
            ref={modalRef}
            className={modalStyle.resetDialog}
            aria-labelledby="reset-dialog-title"
            aria-describedby="reset-dialog-description"
            onCancel={(event) => {
                event.preventDefault()
                closeModal()
            }}
            onClose={() => {
                setModalVisible(false)
                setComment('')
                setError(null)
            }}
            onClick={(event) => {
                if (event.target !== event.currentTarget) return

                const rect = event.currentTarget.getBoundingClientRect()

                const outside =
                    event.clientX < rect.left ||
                    event.clientX > rect.right ||
                    event.clientY < rect.top ||
                    event.clientY > rect.bottom

                if (outside) closeModal()
            }}
        >
            <div className={modalStyle.resetModalWindow}>

                <div
                    className={modalStyle.resetModalIcon}
                    aria-hidden="true"
                >
                    !
                </div>

                <h2
                    id="reset-dialog-title"
                    className={modalStyle.resetModalTitle}
                >
                    Сбросить прогресс?
                </h2>

                <p
                    id="reset-dialog-description"
                    className={modalStyle.resetModalDescription}
                >
                    Весь прогресс прохождения этого квеста будет удалён.
                    Вы сможете начать его заново, но восстановить
                    прежний прогресс не получится.
                </p>

                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        void resetProgress()
                    }}
                >
                    <label
                        htmlFor="reset-confirm"
                        className={modalStyle.resetModalLabel}
                    >
                        Для подтверждения введите слово{' '}
                        <strong>Подтверждаю</strong>
                    </label>

                    <input
                        id="reset-confirm"
                        type="text"
                        placeholder="Подтверждаю"
                        className={modalStyle.resetModalInput}
                        value={comment}
                        disabled={loader}
                        autoComplete="off"
                        autoCapitalize="none"
                        autoFocus
                        onChange={(event) => {
                            setComment(event.target.value)
                            setError(null)
                        }}
                    />

                    {error && (
                        <p
                            className={modalStyle.resetModalError}
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    <div className={modalStyle.resetModalActions}>

                        <button
                            type="button"
                            className={modalStyle.resetModalCancel}
                            onClick={closeModal}
                            disabled={loader}
                        >
                            Отмена
                        </button>

                        <button
                            type="submit"
                            className={modalStyle.resetModalConfirm}
                            disabled={!isConfirmed || loader}
                        >
                            {loader
                                ? 'Сбрасываем...'
                                : 'Сбросить прогресс'
                            }
                        </button>

                    </div>
                </form>

            </div>
        </dialog>
    )
}
