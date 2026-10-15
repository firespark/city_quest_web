
import mainStyle from '../../../styles/mainStyle.module.css'
import FullWidthImage from '../../common/FullWidthImage'

type TaskData = {
    image?: string | null
    text?: string | string[] | null
}

export const ModalFullTask = ({ task }: { task: unknown }) => {

    if (!task) return null

    const taskData = task as TaskData

    const taskText = Array.isArray(taskData.text)
        ? taskData.text.join('\n').trim()
        : (taskData.text || '').trim()

    return (
        <div className={mainStyle.mt20}>

            {taskData.image ? (
                <div>
                    <FullWidthImage source={{ uri: taskData.image }} />
                </div>
            ) : null}

            {taskText ? (
                <div className={mainStyle.wrapper}>
                    <div
                        className={`${mainStyle.paragraph} ${mainStyle.textCenter} ${mainStyle.mt20}`}
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {taskText}
                    </div>
                </div>
            ) : null}

        </div>
    )
}
