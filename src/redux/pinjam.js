import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
const adminSecret = process.env.REACT_APP_ADMIN_SECRET

export const fetchPinjams = createAsyncThunk(
    'pinjam/fetchPinjams',
    async () => {
        const response = await axios.get(`${baseUrl}/pinjam`, {
            headers: { "x-hasura-admin-secret": `${adminSecret}` }
        })
        return response.data
    }
);

export const fetchOnePinjam = createAsyncThunk(
    'pinjam/fetchOnePinjam',
    async (id) => {
        const response = await axios.get(`${baseUrl}/pinjam/${id}`, {
            headers: { "x-hasura-admin-secret": `${adminSecret}` }
        })
        return response.data
    }
);

export const addOnePinjam = createAsyncThunk(
    'pinjam/addOnePinjams',
    async (data) => {
        console.log(data)
        const response = await axios({
            method: "POST",
            data: data,
            url: `${baseUrl}/pinjam`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

export const editOnePinjam = createAsyncThunk(
    'pinjam/editOnePinjam',
    async (id) => {
        const response = await axios({
            method: "PATCH",
            url: `${baseUrl}/pinjam/${id}`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

export const deleteOnePinjam = createAsyncThunk(
    'pinjam/deleteOnePinjam',
    async (id) => {
        const response = await axios({
            method: "DELETE",
            url: `${baseUrl}/pinjam/${id}`,
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
    pinjam: {},
    detailBook: {},
    searched: '',
    message: '',
    success: false,
    tab: 1,
}

const bookSlice = createSlice({
    name: 'book',
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
        // Fetching Book
        [fetchPinjams.pending]: (state, action) => {
            return { ...state, loading: true, error: null, success: false}
        },
        [fetchPinjams.fulfilled]: (state, action) => {
            return { ...state, pinjam: action.payload.pinjam, success: true}
        },
        [fetchPinjams.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },
        
        // Fetching OneBook
        [fetchOnePinjam.pending]: (state, action) => {
            return { ...state, loading: true, error: null, success: false}
        },
        [fetchOnePinjam.fulfilled]: (state, action) => {
            return { ...state, pinjam: action.payload.pinjam, loading: false}
        },
        [fetchOnePinjam.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },
    }
})
export const { setLoading, setSearch, setDetail } = bookSlice.actions;
export default bookSlice.reducer;