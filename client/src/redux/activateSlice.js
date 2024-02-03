import { createSlice } from '@reduxjs/toolkit';

const activateSlice = createSlice({
    name: 'auth',
    initialState: {
        name: '',
        avatar: ''
    },
    reducers: {
        setName(state, action) {
            state.name = action.payload;

        },
        setAvatar(state, action) {
            state.avatar = action.payload;
        }
    }
});

export const { setName, setAvatar } = activateSlice.actions;
export default activateSlice.reducer;