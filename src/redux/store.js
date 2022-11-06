import { configureStore } from "@reduxjs/toolkit";
import bookReducer from './book'
import userReducer from './user'
import pinjamReducer from './pinjam'

const rootReducer = {
    book: bookReducer,
    user: userReducer,
    pinjam: pinjamReducer
}

const store = configureStore({
    reducer: rootReducer
});

export default store;