import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: null,
        otp: {
            phone: '',
            hash: ''
        }
    },
    reducers: {
        setAuth(state, action) {
            state.user = action.payload.user;
            if (state.user === null)
                state.isAuth = false;
            else
                state.isAuth = true;
        },
        setOtp(state, action) {
            const { phone, hash } = action.payload;
            state.otp.phone = phone;
            state.otp.hash = hash;
        },
        setUser(state, action) {
            state.user = action.payload;
            state.isAuth = true;
        }
    }
});

export const { setAuth, setOtp, setUser } = authSlice.actions;
export default authSlice.reducer;