
import questsStyle from '../../styles/questsStyle.module.css'

export const QuestFilters = ({ filter, setFilter }: {
    filter: string
    setFilter: (value: string) => void
}) => {
    return (
        <div className={questsStyle.filterContainer}>
            <div className={questsStyle.filterScroll}>
                <button
                    type="button"
                    className={`${questsStyle.filterPill} ${filter === 'all' ? questsStyle.filterPillActive : ''}`}
                    onClick={() => setFilter('all')}
                >
                    <span className={`${questsStyle.filterText} ${filter === 'all' ? questsStyle.filterTextActive : ''}`}>
                        Все
                    </span>
                </button>

                <button
                    type="button"
                    className={`${questsStyle.filterPill} ${filter === 'free' ? questsStyle.filterPillActive : ''}`}
                    onClick={() => setFilter('free')}
                >
                    <span className={`${questsStyle.filterText} ${filter === 'free' ? questsStyle.filterTextActive : ''}`}>
                        Бесплатные
                    </span>
                </button>

                <button
                    type="button"
                    className={`${questsStyle.filterPill} ${filter === 'paid' ? questsStyle.filterPillActive : ''}`}
                    onClick={() => setFilter('paid')}
                >
                    <span className={`${questsStyle.filterText} ${filter === 'paid' ? questsStyle.filterTextActive : ''}`}>
                        Премиум
                    </span>
                </button>
            </div>
        </div>
    )
}
