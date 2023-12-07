import { createSlice } from '@reduxjs/toolkit'
// import { useLocalStorage } from '../hooks/useLocalStorage'

const initStateLocalStorage = () => {
    let accessToken = localStorage.getItem('accessToken')
        ? JSON.parse(localStorage.getItem('accessToken'))
        : null
    let expire = localStorage.getItem('expire')
        ? JSON.parse(localStorage.getItem('expire'))
        : null
    // console.log('expire', Date(expire));
    if (Date(expire) < new Date()) {
        localStorage.removeItem('expire');
        localStorage.removeItem('accessToken');
        accessToken = null;
        expire = null;
    }

    return { expire: expire, accessToken: accessToken }
}

const slice = createSlice({
    name: 'auth',
    // initialState: { expire: null, accessToken: null },
    initialState: initStateLocalStorage,
    reducers: {
        setCredentials: (
            state,
            { payload: { expire, accessToken } }
        ) => {
            state.expire = expire
            state.accessToken = accessToken
            localStorage.setItem('expire', JSON.stringify(expire))
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
        },
        resetCredentials: (state) => {
            state.expire = null;
            state.accessToken = null;
            localStorage.removeItem('expire');
            localStorage.removeItem('accessToken');
            // localStorage.clear();

        },
    },
})

export const { setCredentials, resetCredentials } = slice.actions

export default slice.reducer

export const selectAuthExpire = (state) => state.auth.expire
export const selectAuthAccessToken = (state) => state.auth.accessToken
