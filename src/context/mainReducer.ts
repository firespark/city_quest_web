
import {
  SET_ROUTE_SCREEN,
  CHANGE_SCREEN,
  PREVIOUS_SCREEN,
  SET_QUEST_ID,
  SET_CITY_DATA,
  SET_TOKEN,
  QUEST_CLEANUP,
  SET_COUNTRY_ID,
  SET_COUNTRIES,
  MAIN_SCREEN,
  MENU_SCREEN,
  GAME_SCREEN,
} from './types'

export type Country = {
  id: number
  title: string
  flag?: string
}

export type CityData = {
  id: number
  title: string
}

export type MainStateData = {
  screens: string[]
  questId: number | null
  cityData: CityData | null
  countryId: number | null
  countries: Country[]
  token?: string
}

export type MainAction =
  | { type: typeof SET_ROUTE_SCREEN; screen: string }
  | { type: typeof CHANGE_SCREEN; screen: string }
  | { type: typeof PREVIOUS_SCREEN }
  | { type: typeof QUEST_CLEANUP }
  | { type: typeof SET_QUEST_ID; questId: number | null }
  | { type: typeof SET_CITY_DATA; cityData: CityData | null }
  | { type: typeof SET_TOKEN; token: string }
  | { type: typeof SET_COUNTRY_ID; countryId: number | null }
  | { type: typeof SET_COUNTRIES; countries: Country[] }

export const mainReducer = (
  state: MainStateData,
  action: MainAction
): MainStateData => {

  switch (action.type) {

    case SET_ROUTE_SCREEN:
      if (state.screens.length === 1 && state.screens[0] === action.screen) {
        return state
      }

      return {
        ...state,
        screens: [action.screen]
      }

    case CHANGE_SCREEN: {
      let previousScreens = state.screens.slice()
      const lastScreen = previousScreens[previousScreens.length - 1]

      if (lastScreen === action.screen) return state

      if (lastScreen === MENU_SCREEN) previousScreens.pop()

      if (action.screen === MAIN_SCREEN) {
        previousScreens = []
      }
      else {
        previousScreens.push(action.screen)
      }

      if (previousScreens.length > 15) {
        previousScreens.shift()
      }

      return {
        ...state,
        screens: previousScreens,
      }
    }

    case PREVIOUS_SCREEN: {
      const screens = state.screens.slice()
      screens.pop()

      return {
        ...state,
        screens: screens,
      }
    }

    case QUEST_CLEANUP: {
      const filteredScreens = state.screens.filter((screen, index) =>
        screen !== GAME_SCREEN || index === state.screens.length - 1
      )

      return {
        ...state,
        screens: filteredScreens,
      }
    }

    case SET_QUEST_ID:
      return {
        ...state,
        questId: action.questId
      }

    case SET_CITY_DATA:
      return {
        ...state,
        cityData: action.cityData
      }

    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }

    case SET_COUNTRY_ID:
      return {
        ...state,
        countryId: action.countryId
      }

    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.countries
      }

    default:
      return state
  }
}
