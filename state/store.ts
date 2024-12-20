import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slices/userSlice'
import { topicsSlice } from './slices/topicsSlice';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        topics: topicsSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;