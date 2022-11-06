import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";

import Table from './component/content/Table'
import Book from './page/Book'
import Home from './page/Home';
import Pengguna from './page/Pengguna';
import DetailBook from './component/book/DetailBook';
import AdminBook from './page/AdminBook';
import Login from './page/Login';
import Pinjam from './page/Pinjam';

function App() {
  return (
    <>
      <Provider store={store}>
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path="/" element={<Home />}>
            {/* <Route index element={<Index />} /> */}
            <Route path="/" element={<Book />}/>
            <Route path="peminjaman" element={<Pinjam />} />
            <Route path="user" element={<Pengguna/>} />
            <Route path="book" element={<AdminBook />}/>
            <Route path="book/:id" element={<DetailBook/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
