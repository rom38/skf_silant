// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://gateway.scan-interfax.ru/api/v1',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = getState().auth.accessToken
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'account/login',
                method: 'POST',
                body: credentials,
            }),
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
export const { useLoginMutation, useGetCompaniesQuery,
    useGetHistogramsQuery, useGetObjectsQuery, useGetDocumentsQuery
} = api
