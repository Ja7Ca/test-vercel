import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
const adminSecret = process.env.REACT_APP_ADMIN_SECRET

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async () => {
        const response = await axios.get(`${baseUrl}/user`, {
            headers: { "x-hasura-admin-secret": `${adminSecret}` }
        })
        return response.data
    }
);

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async (data) => {
        const response = await axios({
            method: "POST",
            data: data,
            url: `${baseUrl}/login`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

export const addUser = createAsyncThunk(
    'user/addUser',
    async (data) => {
        const response = await axios({
            method: "POST",
            data: data,
            url: `${baseUrl}/user`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (data) => {
        const response = await axios({
            method: "PUT",
            data: data,
            url: `${baseUrl}/user`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

export const deleteUser = createAsyncThunk(
    'user/editUser',
    async (data) => {
        const response = await axios({
            method: "DELETE",
            data: {
                username: data
            },
            url: `${baseUrl}/user`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

const initialState = {
    loading: false,
    error: {},
    user: {},
    login: {},
    searched: '',
    message: '',
    success: false,
    tab: 1,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setSearch: (state, action) => {
            state.searched = action.payload
        },
        setMessageProduct:  (state, action) => {
            state.message = action.payload
        },
        
    },
    extraReducers: {
        // Fetching Product
        [fetchUsers.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [fetchUsers.fulfilled]: (state, action) => {
            return { ...state, user: action.payload.users, success: true}
        },
        [fetchUsers.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },
        [userLogin.pending]: (state, action) => {
            return { ...state, loading: true, error: null, }
        },
        [userLogin.fulfilled]: (state, action) => {
            if (action.payload.users) {
                localStorage.setItem("username", action.payload.users[0].username)
                localStorage.setItem("role", action.payload.users[0].role)
            }
            return { ...state, login: action.payload.users, success: true}
        },
        [userLogin.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },
    }
})
export const { setLoading, setSearch, setDetail } = userSlice.actions;
export default userSlice.reducer;