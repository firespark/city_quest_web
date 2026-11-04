import { imageAlt } from '../../../scripts/imageAlt'

import questsStyle from '../../../styles/questsStyle.module.css'
import mainStyle from '../../../styles/mainStyle.module.css'

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
    questTitle: string
}

export const ComingSoonGallery = ({
    photos,
    questTitle
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

    const getPhotoAlt = (photo: ComingSoonGalleryPhoto, index: number) =>
        `${imageAlt('галереи квеста', questTitle)} — ${photo.alt?.trim() || photo.title?.trim() || `фото ${index + 1}`}`

    return (
        <div className={comingSoonStyle.supportSection}>

            <div className={`${questsStyle.eyebrow} ${mainStyle.blue}`}>
                Котики, которые ищут семью
            </div>

            <div className={mainStyle.h2}>При поддержке</div>

            <div
                className={`
                    ${mainStyle.cardGrid} ${mainStyle.galleryGrid}
                    ${photos.length === 1 ? mainStyle.galleryGridSingle : ''}
                `}
            >
                {photos.map((photo, index) => (
                    <button
                        key={`${photo.src}-${index}`}
                        type="button"
                        className={`${comingSoonStyle.galleryCard} ${mainStyle.imageHover}`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={photo.title
                            ? `Открыть: ${photo.title}`
                            : `Открыть ${index + 1}`
                        }
                    >
                        <span className={comingSoonStyle.galleryImageWrapper}>

                            <img
                                src={photo.src}
                                alt={getPhotoAlt(photo, index)}
                                className={mainStyle.interactiveImage}
                                loading="lazy"
                            />

                            <IoExpandOutline
                                className={comingSoonStyle.galleryExpand}
                                size={20}
                                aria-hidden="true"
                            />

                        </span>

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

                    setActiveIndex(null)
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
                            alt={getPhotoAlt(activePhoto, activeIndex!)}
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

        </div>
    )
}
