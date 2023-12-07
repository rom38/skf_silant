import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../services/apiScan'
import authReducer from '../slicers/authSlice'
import searchReducer from '../slicers/searchSlice'

// import { mainApi } from './mainApi'


export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        search: searchReducer,

        // [mainApi.reducerPath]: mainApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
