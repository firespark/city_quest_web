
import questsStyle from '../../styles/questsStyle.module.css'

export type QuestFilter = 'all' | 'free' | 'paid'

type QuestFiltersProps = {
    filter: QuestFilter
    setFilter: (value: QuestFilter) => void
    counts: {
        all: number
        free: number
        paid: number
    }
}

export const QuestFilters = ({
    filter,
    setFilter,
    counts
}: QuestFiltersProps) => {

    return (
        <div
            className={questsStyle.filterContainer}
            role="group"
            aria-label="Фильтры квестов"
        >
            <div className={questsStyle.filterScroll}>

                <button
                    type="button"
                    aria-pressed={filter === 'all'}
                    className={`
                        ${questsStyle.filterPill}
                        ${filter === 'all' ? questsStyle.filterPillActive : ''}
                    `}
                    onClick={() => setFilter('all')}
                >
                    <span className={`
                        ${questsStyle.filterText}
                        ${filter === 'all' ? questsStyle.filterTextActive : ''}
                    `}>
                        Все
                    </span>

                    <span className={questsStyle.filterCount}>
                        {counts.all}
                    </span>
                </button>

                <button
                    type="button"
                    aria-pressed={filter === 'free'}
                    className={`
                        ${questsStyle.filterPill}
                        ${filter === 'free' ? questsStyle.filterPillActive : ''}
                    `}
                    onClick={() => setFilter('free')}
                >
                    <span className={`
                        ${questsStyle.filterText}
                        ${filter === 'free' ? questsStyle.filterTextActive : ''}
                    `}>
                        Бесплатные
                    </span>

                    <span className={questsStyle.filterCount}>
                        {counts.free}
                    </span>
                </button>

                <button
                    type="button"
                    aria-pressed={filter === 'paid'}
                    className={`
                        ${questsStyle.filterPill}
                        ${filter === 'paid' ? questsStyle.filterPillActive : ''}
                    `}
                    onClick={() => setFilter('paid')}
                >
                    <span className={`
                        ${questsStyle.filterText}
                        ${filter === 'paid' ? questsStyle.filterTextActive : ''}
                    `}>
                        Премиум
                    </span>

                    <span className={questsStyle.filterCount}>
                        {counts.paid}
                    </span>
                </button>

            </div>
        </div>
    )
}
