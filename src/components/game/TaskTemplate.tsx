
import type { Dispatch, SetStateAction } from 'react'

import mainStyle from '../../styles/mainStyle.module.css'
import gameStyle from '../../styles/gameStyle.module.css'

import loupeImage from '../../../assets/img/loupe.png'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type TaskData = {
    image?: string | null
    text?: unknown
    [key: string]: unknown
}

type TaskTemplateProps = {
    tasks: unknown
    game: GameData
    setGame?: Dispatch<SetStateAction<GameData>>
    setModal?: Dispatch<SetStateAction<string | null>>
    taskNumber: string
    isModal?: boolean
}

export const TaskTemplate = ({
    tasks, game, setGame, setModal, taskNumber, isModal
}: TaskTemplateProps) => {

    const taskItems = tasks as TaskData[] | null | undefined

    if (!taskItems || taskItems.length === 0) return null

    const setFullTask = (task: TaskData) => {
        if (setGame && setModal) {
            setGame({
                ...game,
                'show_full_task': task,
                'return_to_task': isModal ? taskNumber : null
            })
            setModal('full_task')
        }
    }

    const isGrid = taskItems.length > 1
    const gridWidth = taskItems.length >= 3 ? '31%' : '48%'

    return (
        <div className={`${mainStyle.mt10} ${isGrid ? gameStyle.taskGridWrapper : ''}`}>
            {taskItems.map((task, index) => {

                const cleanTaskText = (text: unknown) =>
                    String(text || '')
                        .replace(/<br\s*\/?>/gi, '\n')
                        .replace(/<[^>]*>/g, '')
                        .trim()

                const taskText = Array.isArray(task.text)
                    ? task.text.map(cleanTaskText).join('\n')
                    : cleanTaskText(task.text)

                const isTextOnlySingle = !isGrid && !task.image && !!taskText

                const cardClassName = [
                    mainStyle.card,
                    gameStyle.taskCard,
                    isGrid ? gameStyle.taskCardGridItem : ''
                ].filter(Boolean).join(' ')

                const cardStyle = isGrid
                    ? { width: gridWidth, aspectRatio: 0.85 }
                    : undefined

                const content = (
                    <>
                        {task.image ? (
                            <div
                                className={gameStyle.taskImageThumbWrapper}
                                style={isGrid ? { flex: 1, aspectRatio: 'auto' } : undefined}
                            >
                                <img
                                    src={task.image}
                                    className={gameStyle.taskImageThumb}
                                    alt=""
                                />
                            </div>
                        ) : null}

                        {taskText ? (
                            <div className={`${gameStyle.taskTextWrapper} ${(!task.image && isGrid) ? gameStyle.taskTextPreviewContainer : ''}`}>
                                <div
                                    className={`${mainStyle.paragraph} ${mainStyle.textCenter} ${isGrid ? gameStyle.taskTextPreview : ''}`}
                                    style={{
                                        whiteSpace: 'pre-line',
                                        ...(isGrid ? {
                                            WebkitLineClamp: task.image ? 2 : 5,
                                            lineClamp: task.image ? 2 : 5
                                        } : {})
                                    }}
                                >
                                    {taskText}
                                </div>
                            </div>
                        ) : null}

                        {!isTextOnlySingle && (
                            <div className={gameStyle.taskLoupeWrapper}>
                                <img
                                    src={loupeImage}
                                    className={gameStyle.taskLoupe}
                                    alt=""
                                />
                            </div>
                        )}
                    </>
                )

                return isTextOnlySingle ? (
                    <div
                        key={index}
                        className={cardClassName}
                        style={cardStyle}
                    >
                        {content}
                    </div>
                ) : (
                    <button
                        key={index}
                        type="button"
                        className={cardClassName}
                        style={cardStyle}
                        onClick={() => setFullTask(task)}
                    >
                        {content}
                    </button>
                )
            })}
        </div>
    )
}
