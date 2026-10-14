
import { useContext, useState, useEffect, useRef } from 'react'
import {
    IoGlobeOutline,
    IoChevronDownOutline,
    IoCheckmarkOutline
} from 'react-icons/io5'
import 'flag-icons/css/flag-icons.min.css'

import modalStyle from '../../styles/modalStyle.module.css'
import { MainContext } from '../../context/mainContext'

const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return ''
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
}

export const CountrySelector = () => {
    const { countryId, countries, setCountryId } = useContext(MainContext)
    const [modalVisible, setModalVisible] = useState(false)
    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (countries.length > 0 && !countryId) {
            setModalVisible(true)
        }
    }, [countries, countryId])

    useEffect(() => {
        const modal = modalRef.current

        if (modalVisible && !modal?.open) {
            modal?.showModal()
        } else if (!modalVisible && modal?.open) {
            modal.close()
        }
    }, [modalVisible])

    const selectedCountry = countries.find(c => c.id === countryId)

    const onSelect = (id: number) => {
        setCountryId(id)
        setModalVisible(false)
    }

    return (
        <div className={modalStyle.countriesWrapper}>
            <button
                type="button"
                className={modalStyle.countriesPremiumSelector}
                onClick={() => setModalVisible(true)}
            >
                <div className={modalStyle.countriesSelectorLeft}>
                    <div className={modalStyle.countriesIconCircle}>


                        {selectedCountry && selectedCountry.flag ? (
                            <span
                                className={`fi fi-${selectedCountry.flag.toLowerCase()}`}
                                style={{ fontSize: 18 }}
                                aria-hidden="true"
                            />
                        ) : (
                            <IoGlobeOutline
                                size={18}
                                color="#7F8C8D"
                            />
                        )}

                    </div>
                    <div>
                        <div className={modalStyle.countriesLabel}>Страна</div>
                        <div className={modalStyle.countryName}>
                            {selectedCountry ? selectedCountry.title : 'Выберите страну'}
                        </div>
                    </div>
                </div>
                <IoChevronDownOutline
                    size={16}
                    color="#7F8C8D"
                    className={modalStyle.countriesChevron}
                />
            </button>

            <dialog
                ref={modalRef}
                className={modalStyle.countriesDialog}
                aria-labelledby="countries-sheet-title"
                onCancel={(event) => {
                    if (countryId) {
                        setModalVisible(false)
                    } else {
                        event.preventDefault()
                    }
                }}
            >
                <div
                    className={modalStyle.countriesModalOverlay}
                    onClick={() => {
                        if (countryId) setModalVisible(false)
                    }}
                >
                    <div
                        className={modalStyle.countriesBottomSheet}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className={modalStyle.countriesDragIndicator} />

                        <div
                            id="countries-sheet-title"
                            className={modalStyle.countriesSheetTitle}
                        >
                            Выберите страну
                        </div>

                        <div className={modalStyle.countriesList}>
                            {countries.map((item) => {
                                const isSelected = item.id === countryId

                                return (
                                    <button
                                        type="button"
                                        key={item.id.toString()}
                                        className={`${modalStyle.countriesItemRow} ${isSelected ? modalStyle.countriesItemRowActive : ''}`}
                                        onClick={() => onSelect(item.id)}
                                    >
                                        <span
                                            className={`${modalStyle.countriesItemText} ${isSelected ? modalStyle.countriesItemTextActive : ''}`}
                                        >

                                            {item.flag && (
                                                <span
                                                    className={`fi fi-${item.flag.toLowerCase()}`}
                                                    style={{ marginRight: 8 }}
                                                    aria-hidden="true"
                                                />
                                            )}
                                            {item.title}

                                        </span>

                                        {isSelected && (
                                            <IoCheckmarkOutline
                                                size={20}
                                                className={modalStyle.countriesCheckMark}
                                            />
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        {countryId && (
                            <button
                                type="button"
                                onClick={() => setModalVisible(false)}
                                className={modalStyle.countriesCancelButton}
                            >
                                <span className={modalStyle.countriesCancelText}>
                                    Закрыть
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </dialog>
        </div>
    )
}
