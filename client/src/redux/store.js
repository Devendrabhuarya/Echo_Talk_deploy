import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import activate from './activateSlice';
import loader from './loaderSlice'

export const store = configureStore({
    reducer: {
        auth,
        activate,
        loader
    },
})