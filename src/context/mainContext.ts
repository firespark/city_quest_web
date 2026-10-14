
import {
  createContext,
  type Dispatch,
  type SetStateAction
} from 'react'

import type { Country, CityData } from './mainReducer'

export type MainContextValue = {
  token: string

  screens: string[]
  questId: number | null
  cityData: CityData | null
  countryId: number | null
  countries: Country[]

  changeScreen: (screen: string) => void
  previousScreen: () => void
  questScreenCleanup: () => void

  setQuestId: (questId: number | null) => void
  setCityData: (cityData: CityData | null) => void
  setCountryId: (id: number) => Promise<void>

  resetToken: () => Promise<void>
  getCountries: () => Promise<void>

  answersState: unknown[]
  setAnswersState: Dispatch<SetStateAction<unknown[]>>
}

export const MainContext = createContext<MainContextValue>(null!)

