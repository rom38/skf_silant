import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    expire: null,
    accessToken: null
}

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        setAccessToken: (state, action) => {
            state.expire = action.payload
        },
        setExpire: (state, action) => {
            state.accessToken = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAccessToken, setExpire } = loginSlice.actions

export default loginSlice.reducer