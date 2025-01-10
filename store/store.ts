import { configureStore } from '@reduxjs/toolkit';
import {restaurantsApi} from "@/services/restaurantsApi";

export const store = configureStore({
    reducer: {
        [restaurantsApi.reducerPath]: restaurantsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(restaurantsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;