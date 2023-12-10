// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = getState().auth.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login/',
                method: 'POST',
                body: credentials,
            }),
        }),
        getCSRF: builder.query({
            query: () => "whoami/",
        }),
        getWhoAmI: builder.query({
            query: () => "whoami/",
        }),
        getIsAuth: builder.query({
            query: () => "isauth/",
        }),
        getCompanies: builder.query({
            query: () => "account/info",
        }),
        getHistograms: builder.query({
            query: (data) => ({
                url: "objectsearch/histograms",
                method: 'POST',
                body: data,
            })
        }),
        getObjects: builder.query({
            query: (data) => ({
                url: "objectsearch",
                method: 'POST',
                body: data,
            })
        }),
        getDocuments: builder.query({
            query: (data) => ({
                url: "documents",
                method: 'POST',
                body: data,
            }),
            // transformResponse: (response) => {
            //     // console.log('response',response)
            //     return response[0].ok
            // }
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useGetCSRFQuery, useGetIsAuthQuery, useGetWhoAmIQuery, useGetCompaniesQuery,
    useGetHistogramsQuery, useGetObjectsQuery, useGetDocumentsQuery
} = api
