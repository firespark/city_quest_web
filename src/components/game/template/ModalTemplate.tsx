
import type { Dispatch, SetStateAction, ReactNode } from 'react'

import mainStyle from '../../../styles/mainStyle.module.css'
import gameStyle from '../../../styles/gameStyle.module.css'

import { ModalClose } from '../modal/ModalClose'

import { ModalAnswer1 } from '../modal/ModalAnswer1'
import { ModalAnswer2 } from '../modal/ModalAnswer2'
import { ModalTask1 } from '../modal/ModalTask1'
import { ModalTask2 } from '../modal/ModalTask2'
import { ModalFullTask } from '../modal/ModalFullTask'
import { ModalHint } from '../modal/ModalHint'
import { ModalHintAlert } from '../modal/ModalHintAlert'
import { ModalSkipAlert } from '../modal/ModalSkipAlert'
import { ModalBackAlert } from '../modal/ModalBackAlert'
import { ModalProgress } from '../modal/ModalProgress'
import { ModalChangeFormatAlert } from '../modal/ModalChangeFormatAlert'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type ModalTemplateProps = {
    game: GameData
    modal: string
    setModal: Dispatch<SetStateAction<string | null>>
    setGame: Dispatch<SetStateAction<GameData>>
    nextGame: () => Promise<void>
}

export const ModalTemplate = ({ game, modal, setModal, setGame, nextGame }: ModalTemplateProps) => {

    const handleClose = () => {
        if (modal === 'image' && game.return_to_task) {
            const taskName = 'task' + (game.return_to_task as string)
            setModal(taskName)
        } else {
            setModal(null)
        }
    }

    let content: ReactNode = null

    switch (modal) {
        case 'answer1': {
            const location = (game.sight_latitude as string) + ',' + (game.sight_longitude as string)
            content =
                <ModalAnswer1
                    title={game.sight_title}
                    image={game.sight_image}
                    address={game.sight_address}
                    location={location}
                    description={game.sight_content}
                    setModal={setModal}
                />
            break
        }

        case 'answer2':
            content = <ModalAnswer2 answer2={game.answer2} setModal={setModal} nextGame={nextGame} />
            break

        case 'task1':
            content = <ModalTask1 game={game} setGame={setGame} setModal={setModal} />
            break

        case 'task2':
            content = <ModalTask2 game={game} setGame={setGame} setModal={setModal} />
            break

        case 'full_task':
            content = <ModalFullTask task={game.show_full_task} />
            break

        case 'hint':
            content = <ModalHintAlert game={game} setGame={setGame} setModal={setModal} />
            break

        case 'skip':
            content = <ModalSkipAlert setGame={setGame} setModal={setModal} />
            break

        case 'changeFormat':
            content =
                <ModalChangeFormatAlert
                    game={game}
                    setGame={setGame}
                    setModal={setModal}
                />
            break

        case 'back':
            content = <ModalBackAlert setModal={setModal} />
            break

        case 'progress':
            content = <ModalProgress game={game} setGame={setGame} setModal={setModal} />
            break

        case 'hint1':
            content = <ModalHint game={game} task={1} />
            break

        case 'hint2':
            content = <ModalHint game={game} task={2} />
            break
    }

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>
            <header className={gameStyle.modalTemplateHeader}>
                <ModalClose setModal={handleClose} />
            </header>

            <main className={`${mainStyle.flex} ${mainStyle.mainScreenScroll}`}>
                <div className={gameStyle.modalTemplateWrapper}>
                    {content}
                </div>
            </main>
        </div>
    )
}
