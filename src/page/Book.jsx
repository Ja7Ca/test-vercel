import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from '../redux/book'
import WrapBook from "../component/book/WrapBook"
import _ from 'lodash'
import Loading from "../component/loading/Loading"

const Pengguna = () => {
    const book = useSelector((state) => state.book)
    const dispatch = useDispatch()

    useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);
    if(!_.isEmpty(book.book)){
        return (
            <WrapBook data={book.book}/>  
        )
    } else {
        return(
            <Loading />
        )
    }
}

export default Pengguna