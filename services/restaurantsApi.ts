'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const restaurantsApi = createApi({
    reducerPath: 'restaurantsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Restaurants'],
    endpoints: (builder) => ({
        getRestaurants: builder.query<Restaurant[], void>({
            query: () => '/restaurants',
            providesTags: ['Restaurants'],
        }),

        updateRestaurantRating: builder.mutation<Restaurant, { id: string; rating: number }>({
            query: ({ id, rating }) => ({
                url: `/restaurants/${id}/rating`,
                method: 'PUT',
                body: { rating },
            }),
            invalidatesTags: ['Restaurants'],
        }),
        addRestaurant: builder.mutation<Restaurant, { name: string; cuisine: string }>({
            query: (newRestaurant) => ({
                url: '/restaurants',
                method: 'POST',
                body: newRestaurant,
            }),
            invalidatesTags: ['Restaurants'],
        }),
        deleteRestaurant: builder.mutation<void, string>({
            query: (id) => ({
                url: `/restaurants/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Restaurants'],
        }),
    }),
});

export const {
    useGetRestaurantsQuery,
    useUpdateRestaurantRatingMutation,
    useAddRestaurantMutation,
    useDeleteRestaurantMutation
} = restaurantsApi;

type Restaurant = {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
}