
import { useContext } from 'react'
import { MainContext } from './context/mainContext'
import {
    ABOUT_SCREEN,
    AUTH_SCREEN,
    CITIES_SCREEN,
    CONTACTS_SCREEN,
    GAME_SCREEN,
    HOWPLAY_SCREEN,
    MAIN_SCREEN,
    MENU_SCREEN,
    PASSWORDRESET_SCREEN,
    PROFILE_SCREEN,
    PROFILESETTINGS_SCREEN,
    QUEST_SCREEN,
    QUESTS_SCREEN,
    SEARCH_SCREEN,
} from './context/types'

import { AboutScreen } from './screens/AboutScreen'
import { AuthScreen } from './screens/AuthScreen'
import { CitiesScreen } from './screens/CitiesScreen'
import { ContactsScreen } from './screens/ContactsScreen'
import { GameScreen } from './screens/GameScreen'
import { HowPlayScreen } from './screens/HowPlayScreen'
import { MainScreen } from './screens/MainScreen'
import { MenuScreen } from './screens/MenuScreen'
import { PasswordResetScreen } from './screens/PasswordResetScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { ProfileSettingsScreen } from './screens/ProfileSettingsScreen'
import { QuestScreen } from './screens/QuestScreen'
import { QuestsScreen } from './screens/QuestsScreen'
import { SearchScreen } from './screens/SearchScreen'

export const Layout = () => {

    const { screens } = useContext(MainContext)

    const screen = screens[screens.length - 1]

    switch (screen) {
        case ABOUT_SCREEN:
            return <AboutScreen />

        case AUTH_SCREEN:
            return <AuthScreen />

        case CITIES_SCREEN:
            return <CitiesScreen />

        case CONTACTS_SCREEN:
            return <ContactsScreen />

        case GAME_SCREEN:
            return <GameScreen />

        case HOWPLAY_SCREEN:
            return <HowPlayScreen />

        case MAIN_SCREEN:
            return <MainScreen />

        case MENU_SCREEN:
            return <MenuScreen />

        case PASSWORDRESET_SCREEN:
            return <PasswordResetScreen />

        case PROFILE_SCREEN:
            return <ProfileScreen />

        case PROFILESETTINGS_SCREEN:
            return <ProfileSettingsScreen />

        case QUEST_SCREEN:
            return <QuestScreen />

        case QUESTS_SCREEN:
            return <QuestsScreen />

        case SEARCH_SCREEN:
            return <SearchScreen />

        default:
            return <MainScreen />
    }
}
