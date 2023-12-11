import { createSlice } from '@reduxjs/toolkit'
// import { useLocalStorage } from '../hooks/useLocalStorage'

const initAuthStorage = () => {
    return { expire: null, isAuth: null, CSRFToken: null, username:null, group:null }
}

const slice = createSlice({
    name: 'auth',
    // initialState: { expire: null, accessToken: null },
    initialState: initAuthStorage,
    reducers: {
        setIsAuth: (
            state,
            { payload: { isAuth } }
        ) => {
            state.isAuth = isAuth
        },
        setCSRF: (
            state,
            { payload: { CSRFToken } }
        ) => {
            state.CSRFToken = CSRFToken
        },
        resetCredentials: (state) => {
            state.expire = null;
            state.CSRFToken = null;
            state.isAuth = null;
            state.username = null;
            state.group = null;

        },
    },
})

export const { setCSRF, setIsAuth, resetCredentials } = slice.actions

export default slice.reducer

export const selectAuthIsAuth = (state) => state.auth.isAuth
export const selectAuthCSRF = (state) => state.auth.CSRFToken
