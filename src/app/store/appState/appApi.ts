import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiBaseUrl = 'http://localhost:3000'

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getThemes: builder.query({
      query: () => 'themes',
    }),
    getArtistsInfo: builder.query({
      query: () => 'artists',
    }),
  }),
})