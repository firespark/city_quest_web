
import { useContext } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { MainContext } from './context/mainContext'
import { ROUTES, getScreenByPath } from './routes'
import { SlugRoute } from './SlugRoute'

import {
    AUTH_SCREEN,
    CITIES_SCREEN,
    CONTACTS_SCREEN,
    GAME_SCREEN,
    MAIN_SCREEN,
    MENU_SCREEN,
    PASSWORDRESET_SCREEN,
    PROFILESETTINGS_SCREEN,
    QUEST_SCREEN,
    QUESTS_SCREEN,
    SEARCH_SCREEN
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
    const location = useLocation()

    const screen = screens[screens.length - 1] ?? MAIN_SCREEN

    if (getScreenByPath(location.pathname) === screen) {
        return (
            <Routes>
                <Route path={ROUTES.HOME} element={<MainScreen />} />
                <Route path={ROUTES.ABOUT} element={<AboutScreen />} />
                <Route path={ROUTES.HOW_PLAY} element={<HowPlayScreen />} />
                <Route path={ROUTES.PROFILE} element={<ProfileScreen />} />
                <Route path={ROUTES.CONTACTS} element={<ContactsScreen />} />
                <Route path={ROUTES.SETTINGS} element={<ProfileSettingsScreen />} />
                <Route path={ROUTES.AUTH} element={<AuthScreen />} />
                <Route path={ROUTES.PASSWORD_RESET} element={<PasswordResetScreen />} />

                <Route
                    path={ROUTES.SLUG}
                    element={<SlugRoute key={location.pathname} />}
                />

                <Route
                    path="*"
                    element={<Navigate to={ROUTES.HOME} replace />}
                />

            </Routes>
        )
    }

    switch (screen) {
        case CITIES_SCREEN:
            return <CitiesScreen />

        case GAME_SCREEN:
            return <GameScreen />

        case MENU_SCREEN:
            return <MenuScreen />

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
