
import { useEffect, useRef, useState } from 'react'
import {
    IoArrowBack,
    IoArrowForward,
    IoClose,
    IoExpandOutline
} from 'react-icons/io5'

import comingSoonStyle from '../../../styles/comingSoonStyle.module.css'

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
        <section className={comingSoonStyle.supportSection}>

            <div className={comingSoonStyle.eyebrow}>
                Котики, которые ищут семью
            </div>

            <h2 className={comingSoonStyle.supportTitle}>
                При поддержке
            </h2>

            <div
                className={`
                    ${comingSoonStyle.galleryGrid}
                    ${photos.length === 1 ? comingSoonStyle.galleryGridSingle : ''}
                `}
            >
                {photos.map((photo, index) => (
                    <button
                        key={`${photo.src}-${index}`}
                        type="button"
                        className={comingSoonStyle.galleryCard}
                        onClick={() => setActiveIndex(index)}
                        aria-label={photo.title
                            ? `Открыть: ${photo.title}`
                            : `Открыть ${index + 1}`
                        }
                    >
                        <div className={comingSoonStyle.galleryImageWrapper}>

                            <img
                                src={photo.src}
                                alt={photo.alt ?? photo.title ?? ''}
                                className={comingSoonStyle.galleryImage}
                                loading="lazy"
                            />

                            <IoExpandOutline
                                className={comingSoonStyle.galleryExpand}
                                size={20}
                                aria-hidden="true"
                            />

                        </div>

                        {photo.title && (
                            <span className={comingSoonStyle.galleryCardTitle}>
                                {photo.title}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                className={comingSoonStyle.galleryDialog}
                aria-label="Просмотр"
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
                    <div className={comingSoonStyle.galleryDialogContent}>

                        <button
                            type="button"
                            className={comingSoonStyle.galleryClose}
                            onClick={() => setActiveIndex(null)}
                            aria-label="Закрыть"
                        >
                            <IoClose size={24} />
                        </button>

                        <img
                            src={activePhoto.src}
                            alt={activePhoto.alt ?? activePhoto.title ?? ''}
                            className={comingSoonStyle.galleryLargeImage}
                        />

                        <div className={comingSoonStyle.galleryDialogFooter}>

                            {activePhoto.title && (
                                <span className={comingSoonStyle.galleryDialogTitle}>
                                    {activePhoto.title}
                                </span>
                            )}

                            <div className={comingSoonStyle.galleryDialogNav}>

                                <span className={comingSoonStyle.galleryCounter}>
                                    {activeIndex! + 1} / {photos.length}
                                </span>

                                {photos.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={showPrevious}
                                            aria-label="Предыдущее фото"
                                            className={comingSoonStyle.galleryNavButton}
                                        >
                                            <IoArrowBack size={20} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={showNext}
                                            aria-label="Следующее фото"
                                            className={comingSoonStyle.galleryNavButton}
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
