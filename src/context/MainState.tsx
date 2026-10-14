
import { useReducer, useState, useEffect, type ReactNode } from 'react'
import { MainContext } from './mainContext'
import { mainReducer, type MainStateData, type Country, type CityData } from './mainReducer'
import {
    MAIN_SCREEN,
    QUEST_CLEANUP,
    CHANGE_SCREEN,
    PREVIOUS_SCREEN,
    SET_QUEST_ID,
    SET_CITY_DATA,
    SET_COUNTRY_ID,
    SET_COUNTRIES
} from './types'

import { Http } from '../scripts/http'

export const MainState = ({ children }: { children: ReactNode }) => {
    const initialState: MainStateData = {
        screens: [MAIN_SCREEN],
        questId: null,
        cityData: null,
        countryId: null,
        countries: []
    }

    const [state, dispatch] = useReducer(mainReducer, initialState)
    const [token, setToken] = useState<string>()
    const [answersState, setAnswersState] = useState<unknown[]>([])

    const setCountryId = async (id: number) => {
        dispatch({ type: SET_COUNTRY_ID, countryId: id })
        try {
            localStorage.setItem('APP_COUNTRY_ID', id.toString())
        } catch (e) {
            console.log(e)
        }
    }

    const getCountries = async () => {
        try {

            const output = await Http.get<Country[]>(`${import.meta.env.VITE_API_URL}/countries/all`)

            if (output.success == 1) {

                const savedCountryId = localStorage.getItem('APP_COUNTRY_ID')

                dispatch({ type: SET_COUNTRIES, countries: output.data as Country[] })

                if (savedCountryId) {
                    dispatch({ type: SET_COUNTRY_ID, countryId: parseInt(savedCountryId) })
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const changeScreen = (screen: string) => dispatch({ type: CHANGE_SCREEN, screen })
    const previousScreen = () => dispatch({ type: PREVIOUS_SCREEN })
    const questScreenCleanup = () => dispatch({ type: QUEST_CLEANUP })
    const setQuestId = (questId: number | null) => dispatch({ type: SET_QUEST_ID, questId })
    const setCityData = (cityData: CityData | null) => dispatch({ type: SET_CITY_DATA, cityData })

    const getToken = async () => {
        try {
            const value = localStorage.getItem('APP_TOKEN')
            if (value) {
                setToken(value)
            } else {
                const newToken = createToken(77) + Date.now()
                saveToken(newToken)
                setToken(newToken)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveToken = async (value: string) => {
        try {
            localStorage.setItem('APP_TOKEN', value)
        } catch (e) {
            console.error('Error:', e)
        }
    }

    const resetToken = async () => {
        const newToken = createToken(77) + Date.now()
        saveToken(newToken)
        setToken(newToken)
    }

    function createToken(length: number) {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return result
    }

    useEffect(() => {
        getToken()
        getCountries()
    }, [])

    return (
        token ? (
            <MainContext.Provider
                value={{
                    token,
                    screens: state.screens,
                    questId: state.questId,
                    cityData: state.cityData,
                    countryId: state.countryId,
                    countries: state.countries,
                    changeScreen,
                    previousScreen,
                    setQuestId,
                    setCityData,
                    setCountryId,
                    resetToken,
                    questScreenCleanup,
                    answersState,
                    setAnswersState,
                    getCountries
                }}
            >
                {children}
            </MainContext.Provider>
        ) : null
    )
}
