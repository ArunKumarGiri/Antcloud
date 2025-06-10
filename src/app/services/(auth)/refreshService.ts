import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'refreshApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.antcloud.co/api/',
        // baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { userRefreshToken: string } }).auth.userRefreshToken
            if (token) {
                headers.set('refresh', `JWT ${token}`)
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        refreshUserToken: builder.query({
            query: () => ({
                url: 'users/refresh',
                method: 'GET',
            })
        })
    })
})

export const { useRefreshUserTokenQuery } = userApi