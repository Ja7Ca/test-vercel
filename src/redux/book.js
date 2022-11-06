import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL
const adminSecret = process.env.REACT_APP_ADMIN_SECRET

export const fetchBooks = createAsyncThunk(
    'book/fetchBooks',
    async () => {
        const response = await axios.get(`${baseUrl}/book`, {
            headers: { "x-hasura-admin-secret": `${adminSecret}` }
        })
        return response.data
    }
);

export const fetchOneBook = createAsyncThunk(
    'book/fetchOneBooks',
    async (id) => {
        const response = await axios.get(`${baseUrl}/book/${id}`, {
            headers: { "x-hasura-admin-secret": `${adminSecret}` }
        })
        return response.data
    }
);

export const AddOneBook = createAsyncThunk(
    'book/addOneBooks',
    async (data) => {
        console.log(data)
        const response = await axios({
            method: "PUT",
            data: data,
            url: `${baseUrl}/book`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

export const EditOneBook = createAsyncThunk(
    'book/editOneBooks',
    async (data) => {
        console.log(data)
        const response = await axios({
            method: "PUT",
            data: data,
            url: `${baseUrl}/book/${data.id}`,
            headers: {
                "x-hasura-admin-secret": `${adminSecret}`,
            }
        })
        return response.data
    }
);

export const DeleteOneBook = createAsyncThunk(
    'book/deleteOneBooks',
    async (id) => {
        const response = await axios({
            method: "DELETE",
            url: `${baseUrl}/book/${id}`,
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
    book: {},
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
        [fetchBooks.pending]: (state, action) => {
            return { ...state, loading: true, error: null, success: false}
        },
        [fetchBooks.fulfilled]: (state, action) => {
            return { ...state, book: action.payload.book, success: true}
        },
        [fetchBooks.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },
        
        // Fetching OneBook
        [fetchOneBook.pending]: (state, action) => {
            return { ...state, detailBook: {}, loading: true, error: null, success: false}
        },
        [fetchOneBook.fulfilled]: (state, action) => {
            return { ...state, detailBook: action.payload.book, loading: false}
        },
        [fetchOneBook.rejected]: (state, action) => {
            return { ...state, error: action.error }
        },
    }
})
export const { setLoading, setSearch, setDetail } = bookSlice.actions;
export default bookSlice.reducer;