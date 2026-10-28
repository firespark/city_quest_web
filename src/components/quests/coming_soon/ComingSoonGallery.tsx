
import { useEffect, useRef, useState } from 'react'
import {
    IoArrowBack,
    IoArrowForward,
    IoClose,
    IoExpandOutline
} from 'react-icons/io5'

import style from '../../../styles/comingSoonStyle.module.css'

export type ComingSoonGalleryPhoto = {
    src: string
    title?: string
    alt?: string
}

type ComingSoonGalleryProps = {
    photos: ComingSoonGalleryPhoto[]
}

export const ComingSoonGallery = ({
    photos
}: ComingSoonGalleryProps) => {

    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current

        if (!dialog) return

        if (activeIndex !== null && !dialog.open) {
            dialog.showModal()
        } else if (activeIndex === null && dialog.open) {
            dialog.close()
        }
    }, [activeIndex])

    const showPrevious = () => {
        setActiveIndex(index => index === null
            ? null
            : (index - 1 + photos.length) % photos.length)
    }

    const showNext = () => {
        setActiveIndex(index => index === null
            ? null
            : (index + 1) % photos.length)
    }

    if (photos.length === 0) return null

    const activePhoto = activeIndex === null
        ? null
        : photos[activeIndex]

    return (
        <section className={style.supportSection}>

            <div className={style.eyebrow}>
                Котики, которые ищут семью
            </div>

            <h2 className={style.supportTitle}>
                При поддержке
            </h2>

            <div
                className={`
                    ${style.galleryGrid}
                    ${photos.length === 1 ? style.galleryGridSingle : ''}
                `}
            >
                {photos.map((photo, index) => (
                    <button
                        key={`${photo.src}-${index}`}
                        type="button"
                        className={style.galleryCard}
                        onClick={() => setActiveIndex(index)}
                        aria-label={photo.title
                            ? `Открыть фотографию: ${photo.title}`
                            : `Открыть фотографию ${index + 1}`
                        }
                    >
                        <div className={style.galleryImageWrapper}>

                            <img
                                src={photo.src}
                                alt={photo.alt ?? photo.title ?? ''}
                                className={style.galleryImage}
                                loading="lazy"
                            />

                            <IoExpandOutline
                                className={style.galleryExpand}
                                size={20}
                                aria-hidden="true"
                            />

                        </div>

                        {photo.title && (
                            <span className={style.galleryCardTitle}>
                                {photo.title}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                className={style.galleryDialog}
                aria-label="Просмотр фотографий"
                onClose={() => setActiveIndex(null)}
                onCancel={event => {
                    event.preventDefault()
                    setActiveIndex(null)
                }}
                onKeyDown={event => {
                    if (event.key === 'ArrowLeft') {
                        event.preventDefault()
                        showPrevious()
                    }

                    if (event.key === 'ArrowRight') {
                        event.preventDefault()
                        showNext()
                    }
                }}
                onClick={event => {
                    if (event.target !== event.currentTarget) return

                    const rect = event.currentTarget.getBoundingClientRect()

                    if (
                        event.clientX < rect.left ||
                        event.clientX > rect.right ||
                        event.clientY < rect.top ||
                        event.clientY > rect.bottom
                    ) {
                        setActiveIndex(null)
                    }
                }}
            >
                {activePhoto && (
                    <div className={style.galleryDialogContent}>

                        <button
                            type="button"
                            className={style.galleryClose}
                            onClick={() => setActiveIndex(null)}
                            aria-label="Закрыть галерею"
                        >
                            <IoClose size={24} />
                        </button>

                        <img
                            src={activePhoto.src}
                            alt={activePhoto.alt ?? activePhoto.title ?? ''}
                            className={style.galleryLargeImage}
                        />

                        <div className={style.galleryDialogFooter}>

                            {activePhoto.title && (
                                <span className={style.galleryDialogTitle}>
                                    {activePhoto.title}
                                </span>
                            )}

                            <div className={style.galleryDialogNav}>

                                <span className={style.galleryCounter}>
                                    {activeIndex! + 1} / {photos.length}
                                </span>

                                {photos.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={showPrevious}
                                            aria-label="Предыдущее фото"
                                            className={style.galleryNavButton}
                                        >
                                            <IoArrowBack size={20} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={showNext}
                                            aria-label="Следующее фото"
                                            className={style.galleryNavButton}
                                        >
                                            <IoArrowForward size={20} />
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>

                    </div>
                )}
            </dialog>

        </section>
    )
}
