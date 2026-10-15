
import type { Dispatch, SetStateAction } from 'react'

import { BackQuest } from '../BackQuest'
import { ChangeGameFormat } from '../ChangeGameFormat'
import { Skips } from '../Skips'
import { Hints } from '../Hints'

import { FinishTemplate } from './FinishTemplate'
//import { ModeTemplate } from './ModeTemplate'
import { TourTemplate } from './TourTemplate'
import { GameFormatTemplate } from './GameFormatTemplate'
import { PlayTemplate } from './PlayTemplate'

import mainStyle from '../../../styles/mainStyle.module.css'
import headerStyle from '../../../styles/headerStyle.module.css'

type GameData = {
    is_level: unknown
    step: number
    [key: string]: unknown
}

type GameTemplateProps = {
    game: GameData
    setGame: Dispatch<SetStateAction<GameData>>
    setModal: Dispatch<SetStateAction<string | null>>
    nextGame: () => Promise<void>
}

export const GameTemplate = ({ game, setGame, setModal, nextGame }: GameTemplateProps) => {

    let template = game.format_id === 2 ? (
        <TourTemplate
            game={game}
            setGame={setGame}
            setModal={setModal}
            nextGame={nextGame}
        />
    ) : (
        <PlayTemplate
            game={game}
            setGame={setGame}
            setModal={setModal}
            nextGame={nextGame}
        />
    )

    if (game.finish && game.step == game.step_total) {
        template = <FinishTemplate
            title={game.quest_title}
            content={game.finish_content}
            game={game}
            setModal={setModal}
            formatId={game.format_id}
        />
    }

    if (game.step == 0) {
        template = <GameFormatTemplate setGame={setGame} />
    }


    /*if (game.step == 0) {
        template = <ModeTemplate
            setGame={setGame}
        />
    }*/

    return (
        <div className={`${mainStyle.pageBackground} ${mainStyle.mainScreen}`}>

            <header className={headerStyle.panelHeader}>
                <BackQuest
                    setModal={setModal}
                />

                <div className={headerStyle.headerActions}>
                    {game.step > 0 && (
                        <ChangeGameFormat
                            formatId={game.format_id}
                            setModal={setModal}
                        />
                    )}

                    {game.format_id == 1 && (
                        <Skips
                            skips={game.skips_number}
                            showSkip={game.show_skip}
                            setModal={setModal}
                            setGame={setGame}
                        />
                    )}

                    {game.format_id == 1 && (
                        <Hints
                            hints={game.hints_number}
                            showHint={game.show_hint}
                            setModal={setModal}
                            setGame={setGame}
                        />
                    )}
                </div>
            </header>

            <main className={`${mainStyle.flex} ${mainStyle.mainScreenScroll}`}>
                <div className={mainStyle.scrollContent}>
                    {template}
                </div>
            </main>

        </div>
    )
}
