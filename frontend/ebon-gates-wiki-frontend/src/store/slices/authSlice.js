import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (username, password) => async dispatch => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { username, password }, { withCredentials: true });
        const userRes = await axios.get('http://localhost:5000/api/auth/current', { withCredentials: true });
        dispatch(loginSuccess(userRes.data.user));
    } catch (err) {
        dispatch(loginFailure(err.response?.data?.message || 'Login Failed'));
    }
};

export const performLogout = () => async dispatch => {
    await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    dispatch(logout());
};

export default authSlice.reducer;